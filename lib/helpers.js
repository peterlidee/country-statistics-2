// returns an array with n times bool
// f.e. n = 3 => [bool, bool, bool]
export function fillArrayWithBool(length, bool){
  const newArray = [];
  for (let i = 0; i < length; i++){
    newArray.push(bool)
  }
  return newArray;
}

// 