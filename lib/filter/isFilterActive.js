// takes a filter and checks if this filter is currently active
// returns true : false
// filter can be region or number, different actions apply to both

function isFilterActive(filter, activeRegions, activeNumbers){
  if(filter === 'regions'){
    return activeRegions.length > 0
  }else{ 
    // number filter
    return activeNumbers.activeNumberFilters.includes(filter)
  }
}

export default isFilterActive