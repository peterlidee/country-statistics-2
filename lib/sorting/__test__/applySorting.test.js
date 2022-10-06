import applySorting from '../applySorting'
import countriesMock from '../../../__mock__/data/countriesMock'

const { extraDataCountries } = countriesMock

describe('function applySorting', () => {

  test('It returns the defaults sorted by default when not routerReady', () => {
    const { countries, sortBy, sortAsc } = applySorting(false, { sort: 'area' }, extraDataCountries)
    expect(countries[0].cca3).toEqual('AUT')
    expect(countries[5].cca3).toEqual('SGS')
    expect(sortBy).toBe('country')
    expect(sortAsc).toBe(true)
  })

  test('It returns a default sorted countries when router ready and no query', () => {
    const { countries, sortBy, sortAsc } = applySorting(true, {}, extraDataCountries)
    expect(countries[0].cca3).toEqual('AUT')
    expect(countries[5].cca3).toEqual('SGS')
    expect(sortBy).toBe('country')
    expect(sortAsc).toBe(true)
  })

  test('It reverse sorts by area when query area', () => {
    const { countries, sortBy, sortAsc } = applySorting(true, { sort: 'area' }, extraDataCountries)
    expect(countries[0].cca3).toEqual('SGS')
    expect(countries[5].cca3).toEqual('MAR')
    expect(sortBy).toBe('area')
    expect(sortAsc).toBe(true)
  })

  test('It sorts by area when query -area', () => {
    const { countries, sortBy, sortAsc } = applySorting(true, { sort: '-area' }, extraDataCountries)
    expect(countries[0].cca3).toEqual('MAR')
    expect(countries[5].cca3).toEqual('SGS')
    expect(sortBy).toBe('area')
    expect(sortAsc).toBe(false)
  })

})