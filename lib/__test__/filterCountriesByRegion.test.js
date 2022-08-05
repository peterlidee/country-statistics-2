import filterCountriesByRegion from '../filterCountriesByRegion'
import countriesMock from '../../__mock__/data/countriesMock'
import filterDataMock from '../../__mock__/data/filterDataMock'

const { extraDataCountries } = countriesMock
const { regionIndexes } = filterDataMock

describe('function filterCountriesByRegion(countries, regionIndexes, activeRegions)', () => {
  test('It return all countries when no activeRegions', () => {
    const filteredCountries = filterCountriesByRegion(extraDataCountries, regionIndexes, [])
    expect(filteredCountries).toHaveLength(6)
  })
  test('It returns correct countries for region', () => {
    const filteredCountries = filterCountriesByRegion(extraDataCountries, regionIndexes, ['Americas'])
    expect(filteredCountries).toHaveLength(1)
    expect(filteredCountries[0].cca3).toBe('PRI')
    const filteredCountries2 = filterCountriesByRegion(extraDataCountries, regionIndexes, ['Europe'])
    expect(filteredCountries2).toHaveLength(3)
  })
  test('It returns correct countries for regions', () => {
    const filteredCountries = filterCountriesByRegion(extraDataCountries, regionIndexes, ['Americas', 'Europe'])
    expect(filteredCountries).toHaveLength(4)
  })
  test('It returns correct countries for subregion', () => {
    const filteredCountries = filterCountriesByRegion(extraDataCountries, regionIndexes, ['Western Europe'])
    expect(filteredCountries).toHaveLength(1)
    expect(filteredCountries[0].cca3).toBe('BEL')
  })
  test('It returns correct countries for subregions', () => {
    const filteredCountries = filterCountriesByRegion(extraDataCountries, regionIndexes, ['Northern Europe', 'Caribbean'])
    expect(filteredCountries).toHaveLength(2)
    expect(filteredCountries[0].cca3).toBe('DNK')
    expect(filteredCountries[1].cca3).toBe('PRI')
  })
  // we don't test for duplicates, that is handled by RegionFilterContext
})