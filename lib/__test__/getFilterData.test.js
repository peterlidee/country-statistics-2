import getFilterData from '../getFilterData'
import { extraDataCountries } from '../../__mock__/data/countriesMock'

// function to test
const filterData = getFilterData(extraDataCountries)

describe('function getFilterData', () => {
  
  test('It returns false when no countries', () => {
    expect(getFilterData()).toBe(false)
  })

  test('It returns an object with 5 properties', () => {
    expect(filterData).toHaveProperty('defaultRegionState')
    expect(filterData).toHaveProperty('regionIndexes')
    expect(filterData).toHaveProperty('area')
    expect(filterData).toHaveProperty('population')
    expect(filterData).toHaveProperty('density')
  })

  const { defaultRegionState } = filterData
  test('defaultRegionState should have 4 regions', () => {
    expect(defaultRegionState).toHaveProperty('Africa')
    expect(defaultRegionState).toHaveProperty('Americas')
    expect(defaultRegionState).toHaveProperty('Antarctic')
    expect(defaultRegionState).toHaveProperty('Europe')
  })

  const { defaultRegionState: { Europe }} = filterData
  test('Europe should', () => {
    // have false on regionActive
    expect(Europe).toHaveProperty('regionActive')
    expect(Europe.regionActive).toBe(false)
    expect(Europe).toHaveProperty('subregionNames')
    expect(Europe.subregionNames).toEqual(
      ['Central Europe', 'Northern Europe', 'Western Europe']
    )
    expect(Europe).toHaveProperty('subregionActive')
    expect(Europe.subregionActive).toEqual(
      [false, false, false]
    )
  })

  describe('regionIndexes', () => {
    const { regionIndexes } = filterData
    
    test('should have 9 properties', () => {
      expect(regionIndexes).toHaveProperty('Africa')
      expect(regionIndexes).toHaveProperty('Americas')
      expect(regionIndexes).toHaveProperty('Antarctic')
      expect(regionIndexes).toHaveProperty('Europe')
      expect(regionIndexes).toHaveProperty('Northern Africa')
      expect(regionIndexes).toHaveProperty('Caribbean')
      expect(regionIndexes).toHaveProperty('Central Europe')
      expect(regionIndexes).toHaveProperty('Northern Europe')
      expect(regionIndexes).toHaveProperty('Western Europe')
    })
    test('should equal', () => {
      expect(regionIndexes['Africa']).toEqual([3])
      expect(regionIndexes['Northern Africa']).toEqual([3])
      expect(regionIndexes['Americas']).toEqual([4])
      expect(regionIndexes['Caribbean']).toEqual([4])
      expect(regionIndexes['Europe']).toEqual([0,1,2])
      expect(regionIndexes['Central Europe']).toEqual([0])
      expect(regionIndexes['Northern Europe']).toEqual([1])
      expect(regionIndexes['Western Europe']).toEqual([2])
      expect(regionIndexes['Antarctic']).toEqual([5])
    })
  })

  // we only test min and max, the other number come from getNumberFilterData
  test('Area should have min and max values', () => {
    expect(filterData.area.countryMin).toBe(3903)
    expect(filterData.area.countryMax).toBe(446550)
  })

  test('Population should have min and max values', () => {
    expect(filterData.population.countryMin).toBe(30)
    expect(filterData.population.countryMax).toBe(36910558)
  })

  test('Density should have min and max values', () => {
    expect(filterData.density.countryMin).toBe(0)
    expect(filterData.density.countryMax).toBe(379)
  })

})