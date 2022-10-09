// 1000000000 -> "1.000.000.000"
export default function formatNumber(num){
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