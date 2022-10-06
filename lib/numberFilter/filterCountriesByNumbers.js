export default function filterCountriesByNumbers(countries, activeNumberFilters, selections){
  
  // don't calculate anything if there are no filters
  if( activeNumberFilters.length == 0) return countries;

  // what selection to use
  // const selection = {
  //   area: areaSelection,
  //   population: populationSelection,
  //   density: densitySelection,
  // }

  // we need to evaluate country against activeNumberFilters
  const filterFunction = country => {

    const valid = [];
    for (let i = 0; i < activeNumberFilters.length; i++){

      // is the county[props] larger then the min selection
      const conditionBigger = country[activeNumberFilters[i]] >= selections[activeNumberFilters[i]][0];
      // is the county[props] smaller then the max selection
      const conditionSmaller = country[activeNumberFilters[i]] <= selections[activeNumberFilters[i]][1];
      // push bool to valid
      valid.push(conditionBigger && conditionSmaller);
    }
    // when all conditions are met
    return valid.every(item => item);
  }
  // return the filtered countries array
  return countries.filter(filterFunction);
}