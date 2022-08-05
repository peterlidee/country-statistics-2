import addExtraData from '../addExtraData'

// make a mock of the raw data
// [0] = correct example
// [1] = broken example no area
// [2] = broken example no population
// [3] = example with name Åland
const mock = [
  {"name":{"common":"Test"},"area":10000,"population":10000000},
  {"name":{"common":"Test"},"population":10000000},
  {"name":{"common":"Test"},"area":10000},
  {"name":{"common":"Test"},"cca3":"ALA"}
]

// run the function
const countriesAdded = addExtraData(mock)

describe('function addExtraData', () => {

  test('It returns false when called with no array', () => {
    expect(addExtraData()).toBe(false)
  })
    
  test('It adds a density and densityPrettyFormat prop to each country when they have an area and a population', () => {
    expect(countriesAdded[0]).toHaveProperty('density')
    expect(countriesAdded[0]).toHaveProperty('densityPrettyFormat')
    expect(countriesAdded[0]).toMatchObject({
      density: 1000,
      densityPrettyFormat: '1.000',
    })
    // test a broken example with no area
    expect(countriesAdded[1]).not.toHaveProperty('density')
    expect(countriesAdded[1]).not.toHaveProperty('densityPrettyFormat')
    // test a broken example with no population
    expect(countriesAdded[2]).not.toHaveProperty('density')
    expect(countriesAdded[2]).not.toHaveProperty('densityPrettyFormat')
  })

  test('It adds areaPrettyFormat if area', () => {
      expect(countriesAdded[0]).toHaveProperty('areaPrettyFormat')
      expect(countriesAdded[0]).toMatchObject({
        'areaPrettyFormat': '10.000'
      })
      expect(countriesAdded[1]).not.toHaveProperty('areaPrettyFormat')
  })

  test('It adds populationPrettyFormat if population', () => {
    expect(countriesAdded[0]).toHaveProperty('populationPrettyFormat')
    expect(countriesAdded[0]).toMatchObject({
      'populationPrettyFormat': '10.000.000'
    })
    expect(countriesAdded[2]).not.toHaveProperty('populationPrettyFormat')
  })

  test('It adds property countryName', () => {
    expect(countriesAdded[0]).toHaveProperty('countryName')
    expect(countriesAdded[0]).toMatchObject({
      'countryName': 'Test'
    })
  })

  test('It replaces Åland with Aland', () => {
    expect(countriesAdded[3].countryName).toBe('Aland Islands')
  })

})