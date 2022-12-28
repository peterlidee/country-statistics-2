import getAndValidateHiddenQuery from '../getAndValidateHiddenQuery'

describe('function getAndValidateHiddenQuery', () => {

  test('It returns empty [] when no hide in query', () => {
    const result = getAndValidateHiddenQuery({})
    expect(result).toEqual([])
  })

  test('It returns empty [] when hide in query is empty', () => {
    const result = getAndValidateHiddenQuery({ hide: '' })
    expect(result).toEqual([])
  })

  test('It returns valid fields', () => {
    const result1 = getAndValidateHiddenQuery({ hide: 'area' })
    expect(result1).toEqual(['area'])
    const result2 = getAndValidateHiddenQuery({ hide: 'area,population,density' })
    expect(result2).toEqual(['area', 'population', 'density'])
  })

  test('It removes invalid fields', () => {
    const result1 = getAndValidateHiddenQuery({ hide: 'foo' })
    expect(result1).toEqual([])
    const result2 = getAndValidateHiddenQuery({ hide: 'area1' })
    expect(result2).toEqual([])
    const result3 = getAndValidateHiddenQuery({ hide: 'foo,area,population,density,bar' })
    expect(result3).toEqual(['area', 'population', 'density'])
  })

})