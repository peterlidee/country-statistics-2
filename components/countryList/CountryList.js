import PropTypes from 'prop-types';

import { useContext, useMemo } from 'react';
import FieldsContext from '../context/FieldsContext';

// import FieldSettings from '../display/FieldSettings';
import Filters from '../filters/Filters';
import CountryListHeaders from './CountryListHeaders';
import CountryRow from './CountryRow';
import sortData from '../../lib/sortData';
import CountryCount from '../header/CountryCount';
import RegionFilterContext from '../context/RegionFilterContext';
import filterCountriesByRegion from '../../lib/filterCountriesByRegion';
import NumberFiltersContext from '../context/NumberFiltersContext';
import filterCountriesByNumbers from '../../lib/filterCountriesByNumbers';

function Countries({ countries, filterData }){

  const { fields } = useContext(FieldsContext);
  const { getActiveRegionFilters } = useContext(RegionFilterContext);
  const { areaSelection, populationSelection, densitySelection, numberFilterIsActive } = useContext(NumberFiltersContext);

  // 1. check the filter options

  // 1.A.
  // first do the region filters 
  // check if there are active regionFilters or not
  const activeRegions = getActiveRegionFilters();
  // run filter by region
  const countriesFilteredByRegion = filterCountriesByRegion(countries, filterData.regionIndexes, activeRegions);

  // 1.B.
  // then do the number filters
  // from fields find out if the filter is displayed or not
  // if it is, check if the filter is active
  const activeNumberFilters = [];
  for( let i = 0; i < fields.length; i++){
    // is the filter displayed?
    if(fields[i].display && fields[i].field !== "country"){ // country is not a filter
      if(numberFilterIsActive(fields[i].field)){ // is the filter active?
        activeNumberFilters.push(fields[i].field)
      }
    }
  }
  console.log('activeNumberFilters',activeNumberFilters)
  // for each value in activeNumberFilters we know it's displayed and active (a selection has been made)
  // now do the actual filtering
  const countriesFilteredByNumbers = filterCountriesByNumbers(countriesFilteredByRegion, activeNumberFilters, areaSelection, populationSelection, densitySelection);
  console.log('countriesFilteredByNuimbers',countriesFilteredByNumbers)
  


  // 2. check the sorting options after the filtering
  // (we can't sort indexes)
  // get the currently active sorting option from fieldsContext
  const sortByField = fields.filter(field => field.sortActive)[0];
  const sortedData = sortData([...countriesFilteredByNumbers], sortByField.sortKey, sortByField.sortAsc, sortByField.sortType)

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
    { "gridTemplateColumns": "1.5em minmax(9em, 15em)"} : 
    { "gridTemplateColumns": `1.5em minmax(9em, 15em) repeat(${numberOfFieldsToDisplay}, minmax(auto, 9em))`};
  
  // 5. display data
  return(
    <div className="site__grid--home">
      <CountryCount count={10} />
      <Filters filterData={filterData} />
      <main className="country-list" style={gridTemplateColumnsStyle}>
        <CountryListHeaders />
        {sortedData.map((country, i) => <CountryRow country={country} index={i} key={country.cca3} />)}
      </main>
    </div>
  )
}

Countries.propTypes = {
  countries: PropTypes.array.isRequired,
  filterData: PropTypes.object.isRequired,
}

export default Countries;