// this function checks if every value in values is a valid (sub)region
// returns an (empty) array of only valid (sub)regions

export default function validateRegionsQuery(values, regionIndexes){
  if(values.length === 0) return values
  return values.filter(value => regionIndexes.hasOwnProperty(value))
}