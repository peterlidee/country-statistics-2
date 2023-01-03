import getAndValidateHiddenQuery from '../getAndValidateHiddenQuery'
import getParameterFromQuery from '../../query/getParameterFromQuery'

jest.mock('../../query/getParameterFromQuery')

beforeEach(() => {
  getParameterFromQuery.mockClear()
})

describe('function getAndValidateHiddenQuery', () => {

  test('It returns valid field area', () => {
    getParameterFromQuery.mockReturnValue(['area'])
    const result = getAndValidateHiddenQuery({})
    expect(result).toEqual(['area'])
  })

  test('It returns valid field area, population and density', () => {
    getParameterFromQuery.mockReturnValue(['area','population','density'])
    const result = getAndValidateHiddenQuery({})
    expect(result).toEqual(['area', 'population', 'density'])
  })

  test('It removes invalid field foo', () => {
    getParameterFromQuery.mockReturnValue(['foo'])
    const result = getAndValidateHiddenQuery()
    expect(result).toEqual([])
  })

  test('It removes invalid fields foo and area1', () => {
    getParameterFromQuery.mockReturnValue(['foo','area1'])
    const result = getAndValidateHiddenQuery()
    expect(result).toEqual([])
  })

  test('It removes invalid field foo but returns valid field area', () => {
    getParameterFromQuery.mockReturnValue(['foo','area'])
    const result = getAndValidateHiddenQuery()
    expect(result).toEqual(['area'])
  })

  test('It removes invalid fields foo but returns valid fields', () => {
    getParameterFromQuery.mockReturnValue(['foo','area', 'population', 'density', 'bar'])
    const result = getAndValidateHiddenQuery()
    expect(result).toEqual(['area','population','density'])
  })

})