import PropTypes from 'prop-types';

import { useContext } from 'react';
import FieldsContext from '../context/FieldsContext';

import FieldSettings from '../display/FieldSettings';
import CountryListHeaders from './CountryListHeaders';
import CountryRow from './CountryRow';
import sortData from '../../lib/sortData';

function Countries({ data }){

  const { fields } = useContext(FieldsContext);

  // 1. check the sorting options
  // get the currently active sorting option from fieldsContext
  const sortByField = fields.filter(field => field.sortActive)[0];
  const sortedData = sortData([...data], sortByField.sortKey, sortByField.sortAsc, sortByField.sortType);
  // TODO: add useMemo
  
  // 2. check the filter options

  // 3. check the display options
  // set the grid template columns to reflect number of fields to display
  // find out how many fields are to be displayed
  // we set the startvalue to -1 because the name of the country is always display
  // and fields[0].display = true always 
  // (this will make the min result of numberOfFieldsToDisplay always minimal 0, not -1)
  const numberOfFieldsToDisplay = fields.reduce((prevValue, currValue) => {
    if(currValue.display) return ++prevValue;
    return prevValue;
  }, -1);
  const gridTemplateColumnsStyle = numberOfFieldsToDisplay < 1 ? 
    { "gridTemplateColumns": "auto minmax(9em, 15em)"} : 
    { "gridTemplateColumns": `auto minmax(9em, 15em) repeat(${numberOfFieldsToDisplay}, minmax(auto, 9em))`};
  
  // 5. display data
  return(
    <>
      <FieldSettings />
      <div className="country-list" style={gridTemplateColumnsStyle}>
        <CountryListHeaders />
        {sortedData.map((country, i) => <CountryRow country={country} index={i} key={country.cca3} />)}
      </div>
    </>
  )
}

Countries.propTypes = {
  data: PropTypes.array.isRequired
}

export default Countries;