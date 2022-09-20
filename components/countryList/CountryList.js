import PropTypes from 'prop-types';

import { useContext, useState, useEffect } from 'react';
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
import { useRouter } from 'next/router';
import fieldsData from '../fields/fieldsData';

function CountryList({ countries, filterData }){

  const { fields } = useContext(FieldsContext);
  const { getActiveRegionFilters } = useContext(RegionFilterContext);
  const { areaSelection, populationSelection, densitySelection, numberFilterIsActive } = useContext(NumberFiltersContext);

  // the state is used to track if we have router.query or not
  const [ ready, setReady ] = useState(false)

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
  
  // 2. do the sorting

  // since we are using SSG, the query object on the router will be empty, it needs to be hydrated first
  // https://nextjs.org/docs/advanced-features/automatic-static-optimization#how-it-works
  // but, this leads to the list of countries being default ordered first and then after hydration getting sorted
  // it's like flash from sorted default to sorted along query sorting parameter
  // obviously, we don't want this, we solve this in 2 ways
  // 1. look at asPath, if '/' this means default sorting will go
  // 2. use router.isReady inside useEffect()
  const router = useRouter()
  useEffect(() => {
    if(router.asPath === '/' || router.isReady){
      setReady(true)
    }
  }, [router.isReady, router.asPath])

  // if ready apply sort, copy the data in case !ready
  let sortedCountries = countriesFilteredByNumbers
  if(ready){
    
    // default sorting
    let sortBy = fieldsData[0].slug
    let sortAsc = fieldsData[0].sortAscDefault
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

  
  // if ready apply display
  if(ready){

  }

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
  /*  TODO check count!!!!! */
  return(
    <div className="site__grid--home">
      <CountryCount count={sortedCountries.length} />
      <Filters filterData={filterData} />
      <main className="country-list" style={gridTemplateColumnsStyle}>
        {ready && <CountryListHeaders />}
        {ready && sortedCountries.map((country, i) => 
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