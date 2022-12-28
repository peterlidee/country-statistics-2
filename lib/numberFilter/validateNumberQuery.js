import validateAgainstDefaults from './validateAgainstDefaults'

// validate a url query
// returns 2 numbers from query of default values
function validateQueryValue(queryValue, defaults){
  // 1. check if there is a value
  // 2. check if the value isn't empty ''
  if(!queryValue){
    return defaults
  }
  // 3. check if the value has a ','
  if(queryValue.indexOf(',') === -1){
    return defaults
  }
  // 4. split the value
  const queryValue1 = parseInt(queryValue.split(',')[0])
  const queryValue2 = parseInt(queryValue.split(',')[1])

  // validate values against each other and against defaults and return result
  return validateAgainstDefaults(queryValue1, queryValue2, defaults)
}

export default validateQueryValue