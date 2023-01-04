import fieldsData from '../../components/fields/fieldsData'
import sortCountries from './sortCountries'

// do some calculations and then sort
// returns sortBy, sortAsc and sortedCountries

export default function applySorting( routerReady, query, countries ){

  // init default sortAsc and sortBy
  let sortBy = fieldsData[0].slug
  let sortAsc = fieldsData[0].sortAscDefault
  // when router not ready, return original countries
  if(!routerReady) return{ countries, sortBy, sortAsc }

  // default field to sortBy
  let currFieldIndex = 0
  
  // is there a sorting param and is it valid
  if(query.hasOwnProperty('sort') && query.sort !== ''){
    // set sortAsc
    sortAsc = !query.sort.startsWith('-')
    // get the param out of the query
    const passedSortBy = sortAsc ? query.sort : query.sort.slice(1)
    // is the param valid? we check it against fieldsData
    currFieldIndex = fieldsData.findIndex(field => field.slug === passedSortBy)
    // if passedSortBy is valid, it was found in fieldsData and index > -1
    // else we pass 0 for the default sort
    if(currFieldIndex > -1){
      sortBy = passedSortBy
    }else{
      // reset the currFieldIndex to 0 (the default country field)
      currFieldIndex = 0
    }
  }

  // sort the countries
  const sortedCountries = sortCountries(
    [...countries], 
    fieldsData[currFieldIndex].sortKey, 
    sortAsc, 
    fieldsData[currFieldIndex].sortType
  )

  return { countries: sortedCountries, sortBy, sortAsc }
}