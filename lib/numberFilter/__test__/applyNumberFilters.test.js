import applyNumberFilters from '../applyNumberFilters'
import filterDataMock from '../../../__mock__/data/filterDataMock'
import countriesMock from '../../../__mock__/data/countriesMock'

const { extraDataCountries } = countriesMock

describe('function applyNumberFilterts', () => {

  // this is kinda an integration test, since all seperate parts have already been tested

  test('It returns all countries when no data', () => {
    expect(applyNumberFilters([], {}, filterDataMock, extraDataCountries)).toHaveLength(6)
  })

  test('It does not filter when all fields are hidden', () => {
    const result = applyNumberFilters(
      ['area','population','density'], 
      { population: '1300000000,1500000000', area: '15000000,18000000', density: '17500,22500' }, 
      filterDataMock,
      extraDataCountries
    )
    expect(result).toHaveLength(6)
  })

  test('It does not filter by density because of faulty query data', () => {
    const result = applyNumberFilters(
      [], 
      { population: '1000000,5000000', area: '0,10000', density: 'boo,22500' }, 
      filterDataMock,
      extraDataCountries
    )
    expect(result).toHaveLength(1)
  })

  test('It filters area correctly', () => {
    const result = applyNumberFilters(
      [], 
      { area: '0,10000' }, 
      filterDataMock,
      extraDataCountries
    )
    expect(result).toHaveLength(2)
  })

  test('It filters population correctly', () => {
    const result = applyNumberFilters(
      [], 
      { population: '1000000,5000000' }, 
      filterDataMock,
      extraDataCountries
    )
    expect(result).toHaveLength(1)
  })

  test('It filters density correctly', () => {
    const result = applyNumberFilters(
      [], 
      { density: '250,500' }, 
      filterDataMock,
      extraDataCountries
    )
    expect(result).toHaveLength(2)
  })

  test('It flips min and max values', () => {
    const result = applyNumberFilters(
      [], 
      { density: '500,250' }, 
      filterDataMock,
      extraDataCountries
    )
    expect(result).toHaveLength(2)
  })

  test('It does not filters when density hidden', () => {
    const result = applyNumberFilters(
      ['density'], 
      { density: '250,500' }, 
      filterDataMock,
      extraDataCountries
    )
    expect(result).toHaveLength(6)
  })

  test('It filters density and area correctly', () => {
    const result = applyNumberFilters(
      [], 
      { area: '10000,60000', density: '100,400' }, 
      filterDataMock,
      extraDataCountries
    )
    expect(result).toHaveLength(2)
  })

})