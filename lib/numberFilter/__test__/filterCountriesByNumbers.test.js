import filterCountriesByNumbers from '../filterCountriesByNumbers'
import countriesMock from '../../__mock__/data/countriesMock'
import filterDataMock from '../../__mock__/data/filterDataMock'

const { extraDataCountries } = countriesMock

const areaSelection = [filterDataMock.area.sliderStart, filterDataMock.area.sliderEnd]
const populationSelection = [filterDataMock.population.sliderStart, filterDataMock.population.sliderEnd]
const densitySelection = [filterDataMock.density.sliderStart, filterDataMock.density.sliderEnd]

function callFilter(arr){
  return filterCountriesByNumbers(
    extraDataCountries, 
    [...arr],
    areaSelection,
    populationSelection,
    densitySelection,
  )
}

describe('function filterCountriesByNumbers(countries, activeNumberFilters, areaSelection, populationSelection, densitySelection)', () => {

  test('It returns all countries when no active filters', () => {
    const filteredCountries = filterCountriesByNumbers(
      extraDataCountries, 
      [],
      areaSelection,
      populationSelection,
      densitySelection,
    )
    expect(filteredCountries).toHaveLength(6)
  })

  test('It returns all countries when there are activeFilters but selections were unchanged', () => {
    const filteredCountries = filterCountriesByNumbers(
      extraDataCountries, 
      ['area', 'population', 'density'],
      areaSelection,
      populationSelection,
      densitySelection,
    )
    expect(filteredCountries).toHaveLength(6)
  })

  describe('Filter by area', () => {

    test('steps', () => {
      const filteredCountries = filterCountriesByNumbers(
        extraDataCountries, 
        ['area'],
        [25000, 450000],
        populationSelection,
        densitySelection,
      )
      expect(filteredCountries).toHaveLength(4)
      expect(filteredCountries[0].cca3).toBe('AUT')
      expect(filteredCountries[1].cca3).toBe('DNK')
      expect(filteredCountries[2].cca3).toBe('BEL')
      expect(filteredCountries[3].cca3).toBe('MAR')

      const filteredCountries2 = filterCountriesByNumbers(
        extraDataCountries, 
        ['area'],
        [0, 75000],
        populationSelection,
        densitySelection,
      )
      expect(filteredCountries2).toHaveLength(4)
      expect(filteredCountries2[0].cca3).toBe('DNK')
      expect(filteredCountries2[1].cca3).toBe('BEL')
      expect(filteredCountries2[2].cca3).toBe('PRI')
      expect(filteredCountries2[3].cca3).toBe('SGS')
    })
  
    test('custom numbers', () => {
      const filteredCountries = filterCountriesByNumbers(
        extraDataCountries, 
        ['area'],
        [11000, 33000],
        populationSelection,
        densitySelection,
      )
      expect(filteredCountries).toHaveLength(1)
      expect(filteredCountries[0].cca3).toBe('BEL')
    })

  })

  describe('Filter by population', () => {
    test('Step', () => {
      const filteredCountries = filterCountriesByNumbers(
        extraDataCountries, 
        ['population'],
        areaSelection,
        [2500000, 12500000],
        densitySelection,
      )
      expect(filteredCountries).toHaveLength(4)
      expect(filteredCountries[0].cca3).toBe('AUT')
      expect(filteredCountries[1].cca3).toBe('DNK')
      expect(filteredCountries[2].cca3).toBe('BEL')
      expect(filteredCountries[3].cca3).toBe('PRI')

      const filteredCountries2 = filterCountriesByNumbers(
        extraDataCountries, 
        ['population'],
        areaSelection,
        [5000000, 8000000],
        densitySelection,
      )
      expect(filteredCountries2).toHaveLength(1)
      expect(filteredCountries2[0].cca3).toBe('DNK')
    })

    test('Custom numbers', () => {
      const filteredCountries = filterCountriesByNumbers(
        extraDataCountries, 
        ['population'],
        areaSelection,
        [3000123, 9000123],
        densitySelection,
      )
      expect(filteredCountries).toHaveLength(3)
      expect(filteredCountries[0].cca3).toBe('AUT')
      expect(filteredCountries[1].cca3).toBe('DNK')
      expect(filteredCountries[2].cca3).toBe('PRI')
    })

  })

  describe('Test density', () => {

    test('Steps', () => {
      const filteredCountries = filterCountriesByNumbers(
        extraDataCountries, 
        ['density'],
        areaSelection,
        populationSelection,
        [75,225],
      )
      expect(filteredCountries).toHaveLength(3)
      expect(filteredCountries[0].cca3).toBe('AUT')
      expect(filteredCountries[1].cca3).toBe('DNK')
      expect(filteredCountries[2].cca3).toBe('MAR')
    })

    test('Custom numbers', () => {
      const filteredCountries = filterCountriesByNumbers(
        extraDataCountries, 
        ['density'],
        areaSelection,
        populationSelection,
        [12,165],
      )
      expect(filteredCountries).toHaveLength(3)
      expect(filteredCountries[0].cca3).toBe('AUT')
      expect(filteredCountries[1].cca3).toBe('DNK')
      expect(filteredCountries[2].cca3).toBe('MAR')
    })

  })

  describe('Filtering by multiple', () => {

    test('area and population', () => {
      const filteredCountries = filterCountriesByNumbers(
        extraDataCountries, 
        ['area', 'population'],
        [40000,100000],
        [5000000,90000000],
        densitySelection
      )
      expect(filteredCountries).toHaveLength(2)
      expect(filteredCountries[0].cca3).toBe('AUT')
      expect(filteredCountries[1].cca3).toBe('DNK')
    })

    test('area and density', () => {
      const filteredCountries = filterCountriesByNumbers(
        extraDataCountries, 
        ['area', 'density'],
        [0,100000],
        populationSelection,
        [100,400],
      )
      expect(filteredCountries).toHaveLength(4)
      expect(filteredCountries[0].cca3).toBe('AUT')
      expect(filteredCountries[1].cca3).toBe('DNK')
      expect(filteredCountries[2].cca3).toBe('BEL')
      expect(filteredCountries[3].cca3).toBe('PRI')
    })

    test('area, population and density', () => {
      const filteredCountries = filterCountriesByNumbers(
        extraDataCountries, 
        ['area', 'population', 'density'],
        [0,100000],
        [5000000,12000000],
        [100,400],
      )
      expect(filteredCountries).toHaveLength(3)
      expect(filteredCountries[0].cca3).toBe('AUT')
      expect(filteredCountries[1].cca3).toBe('DNK')
      expect(filteredCountries[2].cca3).toBe('BEL')
    })

  })

})