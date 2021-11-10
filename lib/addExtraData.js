import { formatNumber, roundNumber } from "./helpers";

// this function add extra data each country object
// takes arr of object, for each object add properties: 1,2,3
// 1. density and densityPrettyFormat if area && population
// 2. areaPrettyFormat if area
// 3. populationPrettyFormat if population
export function addExtraData(arr){
  return arr.map(item => {
    // density
    if(item.hasOwnProperty('area') && item.hasOwnProperty('population')){
      // add population density
      item.density = Math.round( item.population / item.area );
      // add population densityToDisplay
      item.densityPrettyFormat = formatNumber(roundNumber(item.density));
    }
    // area
    if(item.hasOwnProperty('area')){
      // add areaPrettyFormat
      item.areaPrettyFormat = formatNumber(roundNumber(item.area));
    }
    // population
    if(item.hasOwnProperty('population')){
      // add populationPrettyFormat
      item.populationPrettyFormat = formatNumber(roundNumber(item.population));
    }
    return item;
  });
}