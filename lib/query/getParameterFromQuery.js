// this function checks if router.query has a parameter
// if there is no parameter or parameter has empty value, returns []
// else returns array with value split by ','

export default function getParameterFromQuery(parameter, query){
  if(!query.hasOwnProperty(parameter) || query[parameter] === ''){
    return []
  }
  return query[parameter].split(',')
}