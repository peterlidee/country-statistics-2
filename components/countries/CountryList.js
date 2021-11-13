import PropTypes from 'prop-types';
import { addExtraData } from '../../lib/addExtraData';
// import { DisplayContextProvider } from '../context/DisplayContext';
import CountryRow from './CountryRow';
import FieldSettings from '../display/FieldSettings';
import CountryListHeaders from './CountryListHeaders';
import { useContext } from 'react';
import FieldsContext from '../context/FieldsContext';

// import { FieldsContextProvider } from '../context/FieldsContext';

function Countries({ data }){
  //console.log('data',data)
  // 1. add density value to all fields
  // const countriesWithExtraData = addExtraData(data);
  // console.log('countriesWithExtraData',countriesWithExtraData)

  // set the grid template columns to reflect number of fields to display
  const { fields } = useContext(FieldsContext);
  // find out how many fields are to be displayed
  // we set the startvalue to -1 because the name of the country is always display
  // and fields[0].display = true always 
  // (this will make the min result of numberOfFieldsToDisplay always minimal 0, not -1)
  const numberOfFieldsToDisplay = fields.reduce((prevValue, currValue) => {
    if(currValue.display) return ++prevValue;
    return prevValue;
  }, -1);
  //console.log('fields to display', numberOfFieldsToDisplay)
  // grid-template-columns: auto minmax(9em, 15em) repeat(3, minmax(auto, 9em));
  const gridTemplateColumnsStyle = numberOfFieldsToDisplay < 1 ? 
    { "gridTemplateColumns": "auto minmax(9em, 15em)"} : 
    { "gridTemplateColumns": `auto minmax(9em, 15em) repeat(${numberOfFieldsToDisplay}, minmax(auto, 9em))`};

  //const gridTemplateColumnsStyle = `grid-template-columns: auto minmax(9em, 15em) repeat(3, minmax(auto, 9em))`;

  
  // 2. check the filter options
  // 3. check the sorting options
  // 4. check the display options
  // 5. display data
  return(
    <>
      {/*<FieldsContextProvider>*/}
        <FieldSettings />
        <div className="country-list" style={gridTemplateColumnsStyle}>
          <CountryListHeaders />
          {data.map((country, i) => <CountryRow country={country} index={i} key={country.cca3} />)}
        </div>
      {/*</FieldsContextProvider>*/}
    </>
  )
}

Countries.propTypes = {
  data: PropTypes.array.isRequired
}

export default Countries;