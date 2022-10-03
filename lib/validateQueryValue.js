function isNumber(value){
  return typeof value === 'number' && isFinite(value)
}

// we split validateQueryValue into 2 parts because we can use validateAgainstDefaults to test the input from numberfilter

// takes 2 values 
// * checks if they have a value and if they are a number, if not returns defaults
// * validates these values against defaults
function validateAgainstDefaults(value1, value2, defaults){
  // 1. are both values not empty
  if((!value1 && !value1 === 0) || (!value2 && !value2 === 0)){
    return defaults
  }
  // 2. are both values numbers
  if(!isNumber(value1) || !isNumber(value2)){
    return defaults
  }
  // 3. if value1 > value2 flip the values
  const values = [
    value1 > value2 ? value2 : value1,
    value2 < value1 ? value1 : value2
  ]
  // 4. val1 can't be lower then defaultmin and can't be higher the defaultmax
  if(values[0] < defaults[0]) values[0] = defaults[0]
  if(values[0] > defaults[1]) values[0] = defaults[1]
  // 5. val2 can't be lower then defaultmin and can't be higher the defaultmax
  if(values[1] < defaults[0]) values[1] = defaults[0]
  if(values[1] > defaults[1]) values[1] = defaults[1]

  // return values
  return values
}

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
export { isNumber, validateAgainstDefaults }