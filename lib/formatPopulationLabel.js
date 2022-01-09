// take number return formatted number 
// 100000 -> 100.000
function formatNumber(num){
  // format number
  //https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/toLocaleString
  return num.toLocaleString('nl-BE');
}

// of less then 10000 -> only format with . (10000 -> 10.000)
// if more then 10000 -> replace last 3 zero's with k and format with .
// 20000 -> 20k
// 15000000 -> 15.000k
export default function formatPopulationLabel(value){
  if(value <= 10000){
    return formatNumber(value)
  }else{
    return formatNumber(Math.round(value / 1000)) + "k";
  }
}