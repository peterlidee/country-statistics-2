// get number , return formatted numver
// 1000 -> 1.000
// 10000 -> 10.000
// 10000000 -> 10M
export default function formatGDP(number){
  // if zero return zero
  if(number == 0) return number;

  // format number
  //https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/toLocaleString
  const formattedString = number.toLocaleString('nl-BE');

  // check if the formatedString has 6 trailing zero's
  // if so, replace those with 'M'
  // else, don't replace with 'M'

  // check if it has 6 zero's at the end
  const isMillionPlus = formattedString.slice(-8) == ".000.000";

  if(isMillionPlus){
    // slice off the 6 zeros
    // add M
    return formattedString.slice(0,-8) + 'M';
  }
  return formattedString;
}