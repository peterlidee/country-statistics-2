// 1000000000 -> 1.000.000.000
export function formatNumber(num){
  if(num === '') return num;
  if(num < 1000) return num;

  const splitNum = Math.round(num).toString().split('');
  let counter = 0;
  let dotted = [];

  for(let i = splitNum.length; i >= 0; i--){
    dotted.push(splitNum[i]);
    ++counter;
    if(counter > 3 && i > 0){
      dotted.push('.');
      counter = 1;
    }
  }
  return dotted.reverse().join('');
}

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