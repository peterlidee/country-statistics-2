import getNumbersQueryData from '../getNumbersQueryData'
import filterDataMock from '../../../__mock__/data/filterDataMock'

// this is kinda an integration test, since all seperate parts have already been tested
describe('function getNumbersQueryData', () => {

  test('It does not filter a hidden field', () => {
    const result = getNumbersQueryData(
      ['area'], 
      { population: '1000000,2000000', area: '100000,200000', density: '200,300' },
      filterDataMock
    )
    expect(result.activeNumberFilters).toEqual(['population', 'density'])
    expect(result.currentSelections).toMatchObject({ 
      population: [1000000,2000000],
      density: [200,300] 
    })
  })
  
  test('It does not filter when all fields are hidden', () => {
    const result = getNumbersQueryData(
      ['area','population','density'], 
      { population: '1000000,2000000', area: '100000,200000', density: '200,300' },
      filterDataMock
    )
    expect(result.activeNumberFilters).toEqual([])
    expect(result.currentSelections).toEqual({})
  })

  test('It returns valid values', () => {
    const result = getNumbersQueryData(
      [],
      { population: '1000000,2000000', area: '100000,200000', density: '200,300' },
      filterDataMock
    )
    expect(result.currentSelections).toMatchObject({
      area: [100000,200000],
      population: [1000000,2000000],
      density: [200,300] 
    })
  })

  test('It corrects invalid values and returns correct activeNumberFilters', () => {
    const result = getNumbersQueryData(
      [],
      { population: '200000,100000' },
      filterDataMock
    )
    expect(result.currentSelections).toMatchObject({
      population: [100000,200000],
    })
    expect(result.activeNumberFilters).toEqual(['population'])
  })

  test('It corrects invalid values with defaults and returns correct activeNumberFilters', () => {
    const result = getNumbersQueryData(
      [],
      { population: '1000000000000,10000000000000' },
      filterDataMock
    )
    expect(result.currentSelections).toMatchObject({
      population: [37500000,37500000],
    })
    expect(result.activeNumberFilters).toEqual(['population'])
  })

  test('It returns the defaults in currentSelections even when no selection was made (routerQuery empty)', () => {
    const result = getNumbersQueryData(
      [],
      {},
      filterDataMock,
    )
    expect(result.currentSelections).toMatchObject({
      population: [0,37500000],
      area: [0, 450000],
      density: [0,400],
    })
  })

  test('It can handle faulty data selection', () => {
    const result = getNumbersQueryData(
      [],
      { population: 'foo' },
      filterDataMock,
    )
    expect(result.currentSelections).toMatchObject({
      population: [0,37500000],
      area: [0, 450000],
      density: [0,400],
    })
  })

  test('It can handle faulty props selection', () => {
    const result = getNumbersQueryData(
      [],
      { foo: 'bar' },
      filterDataMock,
    )
    expect(result.currentSelections).toMatchObject({
      population: [0,37500000],
      area: [0, 450000],
      density: [0,400],
    })
  })

  test('It can handle faulty hidden', () => {
    const result = getNumbersQueryData(
      ['foo', 'bar'],
      {},
      filterDataMock,
    )
    expect(result.currentSelections).toMatchObject({
      population: [0,37500000],
      area: [0, 450000],
      density: [0,400],
    })
  })

})