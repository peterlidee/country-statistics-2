import isNumber from '../helpers/isNumber'

// takes 2 values 
// * checks if they have a value and if they are a number, if not returns defaults
// * validates these values against defaults

export default function validateNumbersAgainstDefaults(value1, value2, defaults){
  // 1. are both values not empty
  if((!value1 && value1 !== 0) || (!value2 && value2 !== 0)){
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