import formatNumber from '../helpers/formatNumber'
import roundNumber from '../helpers/roundNumber'

// this function add extra data each country object
// takes arr of object, for each object add properties: 1,2,3
// 1. density and densityPrettyFormat if area && population
// 2. areaPrettyFormat if area
// 3. populationPrettyFormat if population
// 4. countryName added as extra field (makes it easier to sort)
// 5. replace some faulty data

export default function addExtraData(arr){
  // console.log('addExtraData called',)
  if(!arr) return false;
  
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
    // countryName
    itemCopy.countryName = itemCopy.name.common;

    // 5. faulty data
    // Åland Islands get sorted incorrrectly!! so flip Å with A
    if(itemCopy.cca3 == 'ALA'){
      itemCopy.countryName = "Aland Islands"
    }
    return itemCopy;
  });
}