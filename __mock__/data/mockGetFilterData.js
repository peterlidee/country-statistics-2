// add countries from 3 different regions
export default function mockGetFilterData(){
  const countries = [];

  countries.push({"name":{"common":"Morocco","official":"Kingdom of Morocco","nativeName":{"ara":{"official":"المملكة المغربية","common":"المغرب"},"ber":{"official":"ⵜⴰⴳⵍⴷⵉⵜ ⵏ ⵍⵎⵖⵔⵉⴱ","common":"ⵍⵎⴰⵖⵔⵉⴱ"}}},"cca3":"MAR","region":"Africa","subregion":"Northern Africa","area":446550.0,"population":36910558})

  countries.push({"name":{"common":"Puerto Rico","official":"Commonwealth of Puerto Rico","nativeName":{"eng":{"official":"Commonwealth of Puerto Rico","common":"Puerto Rico"},"spa":{"official":"Estado Libre Asociado de Puerto Rico","common":"Puerto Rico"}}},"cca3":"PRI","region":"Americas","subregion":"Caribbean","area":8870.0,"population":3194034})

  // add 3 european subregions,
  // expect europe to have 3 subregions
  countries.push({"name":{"common":"Austria","official":"Republic of Austria","nativeName":{"bar":{"official":"Republik Österreich","common":"Österreich"}}},"cca3":"AUT","region":"Europe","subregion":"Central Europe","area":83871.0,"population":8917205})

  countries.push({"name":{"common":"Denmark","official":"Kingdom of Denmark","nativeName":{"dan":{"official":"Kongeriget Danmark","common":"Danmark"}}},"cca3":"DNK","region":"Europe","subregion":"Northern Europe","area":43094.0,"population":5831404})

  countries.push({"name":{"common":"Belgium","official":"Kingdom of Belgium","nativeName":{"deu":{"official":"Königreich Belgien","common":"Belgien"},"fra":{"official":"Royaume de Belgique","common":"Belgique"},"nld":{"official":"Koninkrijk België","common":"België"}}},"cca3":"BEL","region":"Europe","subregion":"Western Europe","area":30528.0,"population":11555997})

  // add a country with no subregion
  countries.push({"name":{"common":"South Georgia","official":"South Georgia and the South Sandwich Islands","nativeName":{"eng":{"official":"South Georgia and the South Sandwich Islands","common":"South Georgia"}}},"cca3":"SGS","region":"Antarctic","subregion":"","area":3903.0,"population":30})

  return countries
}

