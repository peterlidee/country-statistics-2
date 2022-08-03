// This is based on data in mockGetFilterData
// these are the results yielded by mockGetFilterData

/*
const area = {
  sliderStart: 0,
  sliderEnd: 450000,
  sliderStep: 25000,
  countryMin: 3903,
  countryMax: 446550
}
population: {
  sliderStart: 0,
  sliderEnd: 37500000,
  sliderStep: 2500000,
  countryMin: 30,
  countryMax: 36910558
},
const density = {
  sliderStart: 0,
  sliderEnd: 400,
  sliderStep: 25,
  countryMin: 0,
  countryMax: 379
}
*/

export default function mockGetNumberFilterData(){
  return [
    { countryMin: 3903, countryMax: 446550 },
    { countryMin: 30, countryMax: 36910558 },
    { countryMin: 0, countryMax: 379 },
  ]
}
