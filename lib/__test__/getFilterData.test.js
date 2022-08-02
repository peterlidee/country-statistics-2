import getFilterData from '../getFilterData'
import mockGetFilterData from '../../__mock__/data/mockGetFilterData'
import addExtraData from '../addExtraData'

// mocked raw data
const rawData = mockGetFilterData()
// altered data
const addedData = addExtraData(rawData)
// function to test
const countries = getFilterData(addedData)

describe('function getFilterData', () => {
  
  test('It returns false when no countries', () => {
    expect(getFilterData()).toBe(false)
  })

  test('It returns an object with 5 properties', () => {
    expect(countries).toHaveProperty('defaultRegionState')
    expect(countries).toHaveProperty('regionIndexes')
    expect(countries).toHaveProperty('area')
    expect(countries).toHaveProperty('population')
    expect(countries).toHaveProperty('density')
  })

  const { defaultRegionState } = countries
  test('defaultRegionState should have 4 regions', () => {
    expect(defaultRegionState).toHaveProperty('Africa')
    expect(defaultRegionState).toHaveProperty('Americas')
    expect(defaultRegionState).toHaveProperty('Antarctic')
    expect(defaultRegionState).toHaveProperty('Europe')
  })

  const europe = defaultRegionState['Europe']
  test('Europe should', () => {
    // have false on regionActive
    expect(europe).toHaveProperty('regionActive')
    expect(europe.regionActive).toBe(false)
    expect(europe).toHaveProperty('subregionNames')
    expect(europe.subregionNames).toEqual(
      ['Central Europe', 'Northern Europe', 'Western Europe']
    )
    expect(europe).toHaveProperty('subregionActive')
    expect(europe.subregionActive).toEqual(
      [false, false, false]
    )
  })

  describe('regionIndexes', () => {
    const { regionIndexes } = countries
    
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
      expect(regionIndexes['Africa']).toEqual([0])
      expect(regionIndexes['Northern Africa']).toEqual([0])
      expect(regionIndexes['Americas']).toEqual([1])
      expect(regionIndexes['Caribbean']).toEqual([1])
      expect(regionIndexes['Europe']).toEqual([2,3,4])
      expect(regionIndexes['Central Europe']).toEqual([2])
      expect(regionIndexes['Northern Europe']).toEqual([3])
      expect(regionIndexes['Western Europe']).toEqual([4])
      expect(regionIndexes['Antarctic']).toEqual([5])
    })
  })

  // we only test min and max, the other number come from getNumberFilterData

  test('Area should have min and max values', () => {
    expect(countries.area.countryMin).toBe(3903)
    expect(countries.area.countryMax).toBe(446550)
  })

  test('Population should have min and max values', () => {
    expect(countries.population.countryMin).toBe(30)
    expect(countries.population.countryMax).toBe(36910558)
  })

  test('Density should have min and max values', () => {
    expect(countries.density.countryMin).toBe(0)
    expect(countries.density.countryMax).toBe(379)
  })

})