// mocks data returned from api (not exact match)
// rawCountries mocks api call
// extraDataCountries mocks addExtraData(rawCountries)

const rawCountries = [
  {
    "name": {"common":"Austria"},
    "cca3":"AUT",
    "region":"Europe",
    "subregion":"Central Europe",
    "area":83871.0,
    "population":8917205
  },
  {
    "name": {"common":"Denmark"},
    "cca3":"DNK",
    "region":"Europe",
    "subregion":"Northern Europe",
    "area":43094.0,
    "population":5831404
  },
  {
    "name": {"common":"Belgium"},
    "cca3":"BEL",
    "region":"Europe",
    "subregion":"Western Europe",
    "area":30528.0,
    "population":11555997
  },
  {
    "name": {"common":"Morocco"},
    "cca3":"MAR",
    "region":"Africa",
    "subregion":"Northern Africa",
    "area":446550.0,
    "population":36910558
  },
  {
    "name": {"common":"Puerto Rico"},
    "cca3":"PRI",
    "region":"Americas",
    "subregion":"Caribbean",
    "area":8870.0,
    "population":3194034
  },
  {
    "name": {"common":"South Georgia"},
    "cca3":"SGS",
    "region":"Antarctic",
    "subregion":"",
    "area":3903.0,
    "population":30
  },
]
// mocks addExtraData(rawCountries)
const extraDataCountries = [
  {
    name: { common: 'Austria' },
    cca3: 'AUT',
    region: 'Europe',
    subregion: 'Central Europe',
    area: 83871,
    population: 8917205,
    density: 106,
    densityPrettyFormat: 106,
    areaPrettyFormat: '83.871',
    populationPrettyFormat: '8.917.205',
    countryName: 'Austria'
  },
  {
    name: { common: 'Denmark' },
    cca3: 'DNK',
    region: 'Europe',
    subregion: 'Northern Europe',
    area: 43094,
    population: 5831404,
    density: 135,
    densityPrettyFormat: 135,
    areaPrettyFormat: '43.094',
    populationPrettyFormat: '5.831.404',
    countryName: 'Denmark'
  },
  {
    name: { common: 'Belgium' },
    cca3: 'BEL',
    region: 'Europe',
    subregion: 'Western Europe',
    area: 30528,
    population: 11555997,
    density: 379,
    densityPrettyFormat: 379,
    areaPrettyFormat: '30.528',
    populationPrettyFormat: '11.555.997',
    countryName: 'Belgium'
  },
  {
    name: { common: 'Morocco' },
    cca3: 'MAR',
    region: 'Africa',
    subregion: 'Northern Africa',
    area: 446550,
    population: 36910558,
    density: 83,
    densityPrettyFormat: 83,
    areaPrettyFormat: '446.550',
    populationPrettyFormat: '36.910.558',
    countryName: 'Morocco'
  },
  {
    name: { common: 'Puerto Rico' },
    cca3: 'PRI',
    region: 'Americas',
    subregion: 'Caribbean',
    area: 8870,
    population: 3194034,
    density: 360,
    densityPrettyFormat: 360,
    areaPrettyFormat: '8.870',
    populationPrettyFormat: '3.194.034',
    countryName: 'Puerto Rico'
  },
  {
    name: { common: 'South Georgia' },
    cca3: 'SGS',
    region: 'Antarctic',
    subregion: '',
    area: 3903,
    population: 30,
    density: 0,
    densityPrettyFormat: 0,
    areaPrettyFormat: '3.903',
    populationPrettyFormat: 30,
    countryName: 'South Georgia'
  }
]

export { rawCountries, extraDataCountries }