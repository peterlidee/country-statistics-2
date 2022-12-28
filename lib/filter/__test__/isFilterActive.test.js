import isFilterActive from '../isFilterActive'

// we validate regions and numberFilters before calling isFilterActive so we don't need to test for invalid values

describe('function isFilterActive', () => {
  
  describe('It handles regions correctly', () => {

    test('It returns false when no activeRegions', () => {
      const result = isFilterActive('regions', [], {})
      expect(result).toBe(false)
    })

    test('It returns true when one or more activeRegions', () => {
      const result1 = isFilterActive('regions', ['Europe'], {})
      expect(result1).toBe(true)
      const result2 = isFilterActive('regions', ['Europe, Africa'], {})
      expect(result2).toBe(true)
      const result3 = isFilterActive('regions', ['Europe,Americas,Caribbean'], {})
      expect(result3).toBe(true)
    })
  
  })

  describe('It handles numberFilters correctly', () => {

    test('It returns false when no active number filters', () => {
      const result = isFilterActive('area', [], { activeNumberFilters: []})
      expect(result).toBe(false)
    })

    test('It returns false when activeNumberFilters is not current filter', () => {
      const result = isFilterActive('area', [], { activeNumberFilters: ['population']})
      expect(result).toBe(false)
    })

    test('It returns true when current filter area is active', () => {
      const result = isFilterActive('area', [], { activeNumberFilters: ['area', 'population', 'density']})
      expect(result).toBe(true)
    })

    test('It returns true when current filter population is active', () => {
      const result = isFilterActive('population', [], { activeNumberFilters:  ['area', 'population', 'density']})
      expect(result).toBe(true)
    })

    test('It returns true when current filter density is active', () => {
      const result = isFilterActive('density', [], { activeNumberFilters: ['area', 'population', 'density']})
      expect(result).toBe(true)
    })

    test('It returns false when current filter is faulty', () => {
      const result = isFilterActive('foo', [], { activeNumberFilters: ['area', 'population', 'density']})
      expect(result).toBe(false)
    })

  })

})