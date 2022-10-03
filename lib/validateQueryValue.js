function isNumber(value){
  return typeof value === 'number' && isFinite(value)
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
  let queryValue1 = parseInt(queryValue.split(',')[0])
  let queryValue2 = parseInt(queryValue.split(',')[1])
  // 5. are both values not empty
  if(!queryValue1 || !queryValue2){
    return defaults
  }
  // 6. are both values numbers
  if(!isNumber(queryValue1) || !isNumber(queryValue2)){
    return defaults
  }
  // 7. if value1 > value2 flip the values
  if(queryValue1 > queryValue2){
    const tempValue1 = queryValue1
    queryValue1 = queryValue2
    queryValue2 = tempValue1
  }
  // 8. val1 can't be lower then defaultmin and can't be higher the defaultmax
  if(queryValue1 < defaults[0]) queryValue1 = defaults[0]
  if(queryValue1 > defaults[1]) queryValue1 = defaults[1]
  // 9. val2 can't be lower then defaultmin and can't be higher the defaultmax
  if(queryValue2 < defaults[0]) queryValue2 = defaults[0]
  if(queryValue2 > defaults[1]) queryValue2 = defaults[1]

  // return values
  return [queryValue1, queryValue2]
}

export default validateQueryValue
export { isNumber }