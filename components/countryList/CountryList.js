import { useContext, useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';

import fieldsData from '../fields/fieldsData';

import FieldsContext from '../context/FieldsContext';
import NumberFiltersContext from '../context/NumberFiltersContext';
import RegionFilterContext from '../context/RegionFilterContext';

import CountryCount from '../header/CountryCount';
import Filters from '../filters/Filters';
import CountryListHeaders from './CountryListHeaders';
import CountryRow from './CountryRow';

import sortCountries from '../../lib/sortCountries';
import filterCountriesByRegion from '../../lib/filterCountriesByRegion';
import filterCountriesByNumbers from '../../lib/filterCountriesByNumbers';

function CountryList({ countries, filterData }){
  
  const { fields } = useContext(FieldsContext);
  const router = useRouter()

  // since we are using SSG, the query object on the router will be empty, it needs to be hydrated first
  // https://nextjs.org/docs/advanced-features/automatic-static-optimization#how-it-works
  // but, this leads to the list of countries being default ordered first and then after hydration getting sorted
  // it's like flash from sorted default to sorted along query sorting parameter
  // we solve this by listening to router.isReady and setting state routerReady, we only render when state routerReady
  const [ routerReady, setRouterReady ] = useState(false)
  useEffect(() => {
    if(router.isReady){
      setRouterReady(true)
    }
  }, [router.isReady])


  const { getActiveRegionFilters } = useContext(RegionFilterContext);
  const { areaSelection, populationSelection, densitySelection, numberFilterIsActive } = useContext(NumberFiltersContext);


  // TODO: get sort query from router and pass it to countryrow?

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
  // for each value in activeNumberFilters we know it's displayed and active (a selection has been made)
  // now do the actual filtering
  const countriesFilteredByNumbers = filterCountriesByNumbers(countriesFilteredByRegion, activeNumberFilters, areaSelection, populationSelection, densitySelection);
  
  
  // 2. sorting
  // we need to (1) sort the countries and (2) save the router.query.sort so we can pass it to countryRow
  
  // copy countries data in case !routerReady
  let sortedCountries = countriesFilteredByNumbers
  // init default sortAsc and sortBy
  let sortBy = fieldsData[0].slug
  let sortAsc = fieldsData[0].sortAscDefault

  if(routerReady){
    
    // default sorting
    let currFieldIndex = 0

    // is there a sorting param and is it valid
    if(router.query.hasOwnProperty('sort')){
      sortAsc = !router.query.sort.startsWith('-')
      // get the param out of the query
      const passedSortBy = sortAsc ? router.query.sort : router.query.sort.slice(1)
      // is the param valid? we check it against fieldsData
      currFieldIndex = fieldsData.findIndex(field => field.slug === passedSortBy)
      // if passedSortBy is valid, if was found in fieldsData and index > -1
      // else we pass 0 for the default sort
      if(currFieldIndex > -1) sortBy = passedSortBy
    }
    
    // sort the countries
    sortedCountries = sortCountries(
      [...countriesFilteredByNumbers], 
      fieldsData[currFieldIndex].sortKey, 
      sortAsc, 
      fieldsData[currFieldIndex].sortType
    )
  }


  // 3. check the display options
  // we don't wait for routerReady because the headers are only display when routerReady
  // 3.1 we need to know how many fields are displayed to set inline grid
  // 3.2 pass hiddenFields to CountryListHeaders and countryRow
  
  // get the val for hide out of query
  const hiddenFieldsQuery = router.query?.hide
  // make it into an array, an empty one if no values
  const hiddenFields = hiddenFieldsQuery && hiddenFieldsQuery !== '' ? hiddenFieldsQuery.split(',') : []
  // subtract the length of this array from 3 to get number of visible fields
  const numberOfVisibleFields = 3 - hiddenFields.length
  // set grid styles
  const gridTemplateColumnsStyle = numberOfVisibleFields < 1 ? 
    { "gridTemplateColumns": "1.5em minmax(9em, 15em)"} : 
    { "gridTemplateColumns": `1.5em minmax(9em, 15em) repeat(${numberOfVisibleFields}, minmax(auto, 9em))`};
  
    
  // 4. display data
  /*  TODO check count!!!!! */
  return(
    <div className="site__grid--home">
      <CountryCount count={sortedCountries.length} />
      <Filters filterData={filterData} />
      <main className="country-list" style={gridTemplateColumnsStyle}>
        {routerReady && 
          <CountryListHeaders 
            hiddenFields={hiddenFields} 
            sortBy={sortBy} 
            sortAsc={sortAsc} />
        }
        {routerReady && sortedCountries.map((country, i) => 
          <CountryRow 
            country={country} 
            index={i} 
            key={country.cca3} />
        )}
      </main>
    </div>
  )
}

CountryList.propTypes = {
  countries: PropTypes.array.isRequired,
  filterData: PropTypes.object.isRequired,
}

export default CountryList;