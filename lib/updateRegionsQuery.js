export default function updateRegionsQuery(arr, toAdd, toRemove){
  const newArr = [...new Set([...arr,...toAdd])]
  // const newArr = arr.push(...toAdd)
  return newArr.filter(item => !toRemove.includes(item))
}