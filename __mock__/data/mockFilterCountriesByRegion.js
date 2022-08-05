export default function mockFilterCountriesByRegion(){
  const regionIndexes = {
    'Americas': [4],
    'Carribean': [4],
    'Europe': [0,1,2],
    'Central Europe' : [0],
    'Northern Europe': [1],
    'Western Europe' : [2],
    'Africa': [3],
    'Northern Africa': [3],
    'Antarctic': [5],
  }
  const mock = {
    regionIndexes, 
  }
  return mock;
}