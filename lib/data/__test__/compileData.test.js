import compileData from '../compileData'

// make a mock of the raw data
// [0] = correct example
// [1] = broken example no area
// [2] = broken example no population
// [3] = example with name Åland
const mock = [
  {"name":{"common":"Test"},"cca3":"TES","area":10000,"population":10000000,"region":"region","subregion":"subregion"},
  {"name":{"common":"Test"},"population":10000000},
  {"name":{"common":"Test"},"area":10000},
  {"name":{"common":"Test"},"cca3":"ALA"}
]

// run the function
const compiledCountries = compileData(mock)

describe('function compileData', () => {

  test('It returns false when called with no array', () => {
    expect(compileData()).toBe(false)
  })

  test('It adds property countryName', () => {
    expect(compiledCountries[0]).toHaveProperty('countryName')
    expect(compiledCountries[0]).toMatchObject({
      'countryName': 'Test'
    })
  })

  test('It adds an empty string for countryName when there is no name prop or no name.common prop', () => {
    expect(compileData([{"name":{}}])[0].countryName).toBe('')
    expect(compileData([{}])[0].countryName).toBe('')
  })

  test('It adds property cca3', () => {
    expect(compiledCountries[0].cca3).toBe('TES')
  })
    
  test('It adds a region property', () => {
    expect(compiledCountries[0]).toHaveProperty('region')
    expect(compiledCountries[0].region).toBe('region')
  })

  test('It adds a subregion property', () => {
    expect(compiledCountries[0]).toHaveProperty('subregion')
    expect(compiledCountries[0].subregion).toBe('subregion')
  })

  describe('It adds area or not', () => {

    test('It adds a area +prettyformat property when the item has area prop', () => {
      expect(compiledCountries[0]).toHaveProperty('area')
      expect(compiledCountries[0]).toHaveProperty('areaPrettyFormat')
      expect(compiledCountries[0]).toMatchObject({
        'area': 10000,
        'areaPrettyFormat': '10.000'
      })
    })
  
    test('It does not add a area +prettyformat property when the item has no area prop', () => {
      expect(compiledCountries[1]).not.toHaveProperty('area')
      expect(compiledCountries[1]).not.toHaveProperty('areaPrettyFormat')
    })

  })

  describe('It adds population or not', () => {

    test('It adds a population +prettyformat property when the item has population prop', () => {
      expect(compiledCountries[0]).toHaveProperty('population')
      expect(compiledCountries[0]).toHaveProperty('populationPrettyFormat')
      expect(compiledCountries[0]).toMatchObject({
        'population': 10000000,
        'populationPrettyFormat': '10.000.000'
      })
    })
  
    test('It does not add a population +prettyformat property when the item has no population prop', () => {
      expect(compiledCountries[2]).not.toHaveProperty('population')
      expect(compiledCountries[2]).not.toHaveProperty('populationPrettyFormat')
    })

  })
  
  test('It adds a density and densityPrettyFormat prop to each country when they have an area and a population', () => {
    expect(compiledCountries[0]).toHaveProperty('density')
    expect(compiledCountries[0]).toHaveProperty('densityPrettyFormat')
    expect(compiledCountries[0]).toMatchObject({
      density: 1000,
      densityPrettyFormat: '1.000',
    })
    // test a broken example with no area
    expect(compiledCountries[1]).not.toHaveProperty('density')
    expect(compiledCountries[1]).not.toHaveProperty('densityPrettyFormat')
    // test a broken example with no population
    expect(compiledCountries[2]).not.toHaveProperty('density')
    expect(compiledCountries[2]).not.toHaveProperty('densityPrettyFormat')
  })

  test('It replaces Åland with Aland', () => {
    expect(compiledCountries[3].countryName).toBe('Aland Islands')
  })

})