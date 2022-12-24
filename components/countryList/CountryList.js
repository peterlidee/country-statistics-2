import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'

import filterCountriesByRegion from '../../lib/regionFilter/filterCountriesByRegion'
import applyNumberFilters from '../../lib/numberFilter/applyNumberFilters'
import applySorting from '../../lib/sorting/applySorting'

import CountryCount from '../header/CountryCount';
import Filters from '../filters/Filters';
import CountryListHeaders from './CountryListHeaders';
import CountryRow from './CountryRow';

import PropTypes from 'prop-types'

function CountryList({ countries, filterData }){
  
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

  // 1. check the display options

  // we don't wait for routerReady because the headers are only displayed when routerReady
  // we need to know display fields in 3 cases
  // - to filter (we don't filter hidden fields)
  // - to set grid
  // - to pass to CountryListHeaders and countryRow
  
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

  // 2. check the filter options

  // 2.A. apply region filters 
  // check if there are active regionFilters or not
  const activeRegions = router.query.hasOwnProperty('regions') && router.query.regions !== '' ? router.query.regions.split(',') : []
  // run filter by region
  const countriesFilteredByRegion = filterCountriesByRegion(countries, filterData.regionIndexes, activeRegions);

  // 2.B. apply number filters
  const countriesFilteredByNumbers = applyNumberFilters(hiddenFields, router.query, filterData, countriesFilteredByRegion)

  // 3. sorting
  const { countries: sortedCountries, sortBy, sortAsc } = applySorting(routerReady, router.query, countriesFilteredByNumbers)

  return(
    <div className="site__grid--home">
      {!routerReady && '...loading'}
      {routerReady && <>
        <CountryCount count={sortedCountries.length} />
        <Filters 
          hiddenFields={hiddenFields}
          filterData={filterData} />
        <main className="country-list" style={gridTemplateColumnsStyle}>
          <CountryListHeaders 
            hiddenFields={hiddenFields} 
            sortBy={sortBy} 
            sortAsc={sortAsc} />
          {sortedCountries.length === 0 && 
            <div style={{ 'gridColumn': '2/-1' }}>no results</div>
          }
          {sortedCountries.map((country, i) => 
            <CountryRow 
              country={country} 
              index={i} 
              key={country.cca3} 
              hiddenFields={hiddenFields} />)}
        </main>
      </>}
    </div>
  )
}

CountryList.propTypes = {
  countries: PropTypes.array.isRequired,
  filterData: PropTypes.object.isRequired,
}

export default CountryList;