import { formatNumber, roundNumber } from "./helpers";

// this function add extra data each country object
// takes arr of object, for each object add properties: 1,2,3
// 1. density and densityPrettyFormat if area && population
// 2. areaPrettyFormat if area
// 3. populationPrettyFormat if population
export function addExtraData(arr){
  console.log('addExtraData called',)
  return arr.map(item => {
    // take copy of item object as to not polute original data
    const itemCopy = {...item};
    // density
    if(itemCopy.hasOwnProperty('area') && itemCopy.hasOwnProperty('population')){
      // add population density
      itemCopy.density = Math.round( itemCopy.population / itemCopy.area );
      // add population densityToDisplay
      itemCopy.densityPrettyFormat = formatNumber(roundNumber(itemCopy.density));
    }
    // area
    if(itemCopy.hasOwnProperty('area')){
      // add areaPrettyFormat
      itemCopy.areaPrettyFormat = formatNumber(roundNumber(itemCopy.area));
    }
    // population
    if(itemCopy.hasOwnProperty('population')){
      // add populationPrettyFormat
      itemCopy.populationPrettyFormat = formatNumber(roundNumber(itemCopy.population));
    }
    return itemCopy;
  });
}