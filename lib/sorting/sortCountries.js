// sort an array
// key to sort by
// by text or number
// asc or desc

export default function sortCountries(arr, sortKey, sortAsc, sortType){

  let sortedArr = [];

  if(sortType == "number"){
    sortedArr = arr.sort((a, b) => {
      if(sortAsc) return(a[sortKey] - b[sortKey]);
      return(b[sortKey] - a[sortKey]);
    })
  }else{
    sortedArr = arr.sort((a,b) => {
      // sort asc
      if(sortAsc){
        if(a[sortKey] > b[sortKey]) return 1;
        if(b[sortKey] > a[sortKey]) return -1;
        return 0;
      }
      // sort desc
      if(a[sortKey] < b[sortKey]) return 1;
      if(b[sortKey] < a[sortKey]) return -1;
      return 0;
    })
  }
  return sortedArr;
}