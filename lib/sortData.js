// sort an array
// key to sort by
// by text or number
// asc or desc
export default function sortData(arr, sortKey, sortAsc, sortType){
  // TODO: remove console
  console.log('sortData called',)
  let sortedArr = [];

  if(sortType == "number"){
    sortedArr = arr.sort((a, b) => {
      if(sortAsc) return(a[sortKey] - b[sortKey]);
      return(b[sortKey] - a[sortKey]);
    })
  }else{
    sortedArr = arr.sort((a,b) => {
      if(sortAsc) return a[sortKey] > b[sortKey]
      return a[sortKey] < b[sortKey]
    })
  }
  return sortedArr;
}