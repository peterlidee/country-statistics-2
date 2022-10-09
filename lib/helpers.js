// rounds the number
// or returns empty one
export function roundNumber(num){
  if(num === '') return num;
  if(num < 0) return 0;
  // if(num < 1) return (Math.round(num * 10))/10;
  return Math.round(num);
}

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