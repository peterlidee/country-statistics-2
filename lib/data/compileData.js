import formatNumber from '../helpers/formatNumber'
import roundNumber from '../helpers/roundNumber'

// this function compiles the data from the raw data
// [A] it copies all required data to (simpler) props
// [B] it add some extra data
// [A] copy required data to simpler props
// [B] takes arr of object, for each object add properties: 1,2,3
// 1. density and densityPrettyFormat if area && population
// 2. areaPrettyFormat if area
// 3. populationPrettyFormat if population
// 4. countryName added as extra field (makes it easier to sort)
// 5. replace some faulty data

export default function compileData(arr){
  // console.log('addExtraData called',)
  if(!arr) return false
  
  return arr.map(item => {
    // purely copy some props
    const itemCopy = {
      countryName: item?.name?.common || '',
      cca3: item.cca3,
      region: item.region,
      subregion: item.subregion,
    }

    // density
    if(item.hasOwnProperty('area') && item.hasOwnProperty('population')){
      // add population density
      itemCopy.density = Math.round( item.population / item.area )
      // add population densityToDisplay
      itemCopy.densityPrettyFormat = formatNumber(roundNumber(itemCopy.density))
    }
    
    // area
    if(item.hasOwnProperty('area')){
      // add area
      itemCopy.area = item.area
      // add areaPrettyFormat
      itemCopy.areaPrettyFormat = formatNumber(roundNumber(itemCopy.area))
    }
    
    // population
    if(item.hasOwnProperty('population')){
      // add population
      itemCopy.population = item.population
      // add populationPrettyFormat
      itemCopy.populationPrettyFormat = formatNumber(roundNumber(itemCopy.population))
    }

    // 5. faulty data
    // Åland Islands get sorted incorrrectly!! so flip Å with A
    if(itemCopy.cca3 == 'ALA'){
      itemCopy.countryName = "Aland Islands"
    }
    return itemCopy
  });
}