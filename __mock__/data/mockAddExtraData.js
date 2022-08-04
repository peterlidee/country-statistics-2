// make a mock of the raw data

// [0] = correct example
// [1] = broken example no area
// [2] = broken example no population
// [3] = example with name Åland
export default function mockAddExtraData(){
  return [
    {"name":{"common":"Test"},"area":10000,"population":10000000},
    {"name":{"common":"Test"},"population":10000000},
    {"name":{"common":"Test"},"area":10000},
    {"name":{"common":"Åland Islands"},"cca3":"ALA"}
  ]
}