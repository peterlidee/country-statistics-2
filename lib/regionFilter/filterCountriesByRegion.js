// this function filters the main countries array by region
// if there are active regionFilters it returns only the countries in these regions
// else returns all (= countries)
export default function filterCountriesByRegion(countries, regionIndexes, activeRegions){
  
  const countriesFilteredByRegion = [];
  if(activeRegions.length > 0){ // there are active region filters
    // get list of all the indexes for current selection
    let currIndexes = [];
    for(let i = 0; i < activeRegions.length; i++){
      // ignore non existing (sub)regions
      if(regionIndexes.hasOwnProperty(activeRegions[i])){
        const activeRegionIndexes = regionIndexes[activeRegions[i]];
        currIndexes = [...currIndexes, ...activeRegionIndexes];
      }
    }
    // filter out doubles, f.e. if a region is active, all it's subregions will also be active
    currIndexes = [...new Set(currIndexes)]

    // construct list of all countries, based on these indexes
    for(let i = 0; i < currIndexes.length; i++){
      countriesFilteredByRegion.push(countries[currIndexes[i]])
    }
    return countriesFilteredByRegion;

  }else{ // no filters, just return original array
    return countries;
  }
}