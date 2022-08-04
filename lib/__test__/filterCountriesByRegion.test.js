import filterCountriesByRegion from '../filterCountriesByRegion'
import mockFilterCountriesByRegion from '../../__mock__/data/mockFilterCountriesByRegion'
import mockCountries from '../../__mock__/data/mockCountries'

const { extraDataCountries } = mockCountries()

const { regionIndexes } = mockFilterCountriesByRegion()

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
    const filteredCountries = filterCountriesByRegion(extraDataCountries, regionIndexes, ['Northern Europe', 'Carribean'])
    expect(filteredCountries).toHaveLength(2)
    expect(filteredCountries[0].cca3).toBe('DNK')
    expect(filteredCountries[1].cca3).toBe('PRI')
  })
  // we don't test for duplicates, that is handled by RegionFilterContext
})