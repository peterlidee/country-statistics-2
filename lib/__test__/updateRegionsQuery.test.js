import updateRegionsQuery from '../updateRegionsQuery'

describe('lib/updateRegionsQuery', () => {

  test('It returns the same array when toAdd and toRemove are empty', () => {
    const result = updateRegionsQuery(['a', 'b', 'c'], [], [])
    expect(result).toHaveLength(3)
    expect(result).toEqual(['a','b','c'])
  })



})