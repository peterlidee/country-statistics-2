// get min and max value from arr
// round min to 0
export function getMinAndMax(arr){
  const minValue = Math.min(...arr);
  const min = minValue < 0 ? 0 : minValue;
  const max = Math.max(...arr);
  return { min, max }
}

// to produce a numberfilter we need some data
// 1.
// a min and max value from the array
export function getNumberFilterData(arr){
  // 1.
  const { min, max } = getMinAndMax(arr);
}