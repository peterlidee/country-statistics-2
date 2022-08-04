export default function mockFilterCountriesByRegion(){
  const countries = [
    {"name":{"common":"Austria"},"cca3":"AUT","region":"Europe","subregion":"Central Europe","area":83871.0,"population":8917205},
    {"name":{"common":"Denmark"},"cca3":"DNK","region":"Europe","subregion":"Northern Europe","area":43094.0,"population":5831404},
    {"name":{"common":"Belgium"},"cca3":"BEL","region":"Europe","subregion":"Western Europe","area":30528.0,"population":11555997},
    {"name":{"common":"Morocco"},"cca3":"MAR","region":"Africa","subregion":"Northern Africa","area":446550.0,"population":36910558},
    {"name":{"common":"Puerto Rico"},"cca3":"PRI","region":"Americas","subregion":"Caribbean","area":8870.0,"population":3194034},
    {"name":{"common":"South Georgia"},"cca3":"SGS","region":"Antarctic","subregion":"","area":3903.0,"population":30},
  ]
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
    countries, 
    regionIndexes, 
  }
  return mock;
}