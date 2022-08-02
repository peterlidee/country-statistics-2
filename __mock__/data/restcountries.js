// make a mock of the raw data
// we make a small selection of all the countries
// to be able to test all the operations

// [0] = correct example
// [1] = broken example no area
// [2] = broken example no population
// [3] = example with name Åland
function mockForExtraData(){
  return [{"name":{"common":"Test"},"area":10000,"population":10000000},{"name":{"common":"Test"},"population":10000000},{"name":{"common":"Test"},"area":10000},{"name":{"common":"Åland Islands"},"cca3":"ALA"}]
}

export default function getRestCountriesJSON(){

  const countries = [];

  // add countries from 3 different regions
  countries.push({"name":{"common":"Belgium","official":"Kingdom of Belgium","nativeName":{"deu":{"official":"Königreich Belgien","common":"Belgien"},"fra":{"official":"Royaume de Belgique","common":"Belgique"},"nld":{"official":"Koninkrijk België","common":"België"}}},"cca3":"BEL","region":"Europe","subregion":"Western Europe","area":30528.0,"population":11555997})

  countries.push({"name":{"common":"Morocco","official":"Kingdom of Morocco","nativeName":{"ara":{"official":"المملكة المغربية","common":"المغرب"},"ber":{"official":"ⵜⴰⴳⵍⴷⵉⵜ ⵏ ⵍⵎⵖⵔⵉⴱ","common":"ⵍⵎⴰⵖⵔⵉⴱ"}}},"cca3":"MAR","region":"Africa","subregion":"Northern Africa","area":446550.0,"population":36910558})

  countries.push({"name":{"common":"Puerto Rico","official":"Commonwealth of Puerto Rico","nativeName":{"eng":{"official":"Commonwealth of Puerto Rico","common":"Puerto Rico"},"spa":{"official":"Estado Libre Asociado de Puerto Rico","common":"Puerto Rico"}}},"cca3":"PRI","region":"Americas","subregion":"Caribbean","area":8870.0,"population":3194034})

  // add 3 european subregions,
  // expect europe to have 3 subregions
  countries.push({"name":{"common":"Austria","official":"Republic of Austria","nativeName":{"bar":{"official":"Republik Österreich","common":"Österreich"}}},"cca3":"AUT","region":"Europe","subregion":"Central Europe","area":83871.0,"population":8917205})

  countries.push({"name":{"common":"Denmark","official":"Kingdom of Denmark","nativeName":{"dan":{"official":"Kongeriget Danmark","common":"Danmark"}}},"cca3":"DNK","region":"Europe","subregion":"Northern Europe","area":43094.0,"population":5831404})

  countries.push({"name":{"common":"Belgium","official":"Kingdom of Belgium","nativeName":{"deu":{"official":"Königreich Belgien","common":"Belgien"},"fra":{"official":"Royaume de Belgique","common":"Belgique"},"nld":{"official":"Koninkrijk België","common":"België"}}},"cca3":"BEL","region":"Europe","subregion":"Western Europe","area":30528.0,"population":11555997})

  // Add Aland Islands
  countries.push({"name":{"common":"Åland Islands","official":"Åland Islands","nativeName":{"swe":{"official":"Landskapet Åland","common":"Åland"}}},"cca3":"ALA","region":"Europe","subregion":"Northern Europe","area":1580.0,"population":29458})

  // add a country with no subregion
  countries.push({"name":{"common":"South Georgia","official":"South Georgia and the South Sandwich Islands","nativeName":{"eng":{"official":"South Georgia and the South Sandwich Islands","common":"South Georgia"}}},"cca3":"SGS","region":"Antarctic","subregion":"","area":3903.0,"population":30})

  // expect: 4 regions: antarctica, europe, americas, africa
  // expect europe to have 3 subregions: western, central, northern

  const json = JSON.stringify(countries)

  return json;
}

export { mockForExtraData };