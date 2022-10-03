import validateQueryValue, { isNumber } from '../validateQueryValue'

describe('function isNumber', () => {
  test('It returns true or false when number or not', () => {
    expect(isNumber('abc')).toBe(false)
    expect(isNumber('abc123')).toBe(false)
    expect(isNumber('123')).toBe(false)
    expect(isNumber(123)).toBe(true)
    expect(isNumber(1.23)).toBe(true)
    expect(isNumber(-1.23)).toBe(true)
  })
})

describe('validateQueryValue', () => {
  
  test('It returns defaults when !queryValue', () => {
    expect(validateQueryValue(undefined, [1])).toEqual([1])
    expect(validateQueryValue('', [2])).toEqual([2])
  })

  test('It returns defaults when no komma', () => {
    expect(validateQueryValue('123', [3])).toEqual([3])
  })

  test('It returns defaults when one of the split values is !', () => {
    expect(validateQueryValue('123,', [4])).toEqual([4])
    expect(validateQueryValue(',', [5])).toEqual([5])
  })

  test('It returns defaults when one or both of the values are not a number', () => {
    expect(validateQueryValue('123,aaa', [6])).toEqual([6])
    expect(validateQueryValue('aaa,bbb123', [7])).toEqual([7])
  })

  test('If the value is higher then the second value, flip them around', () => {
    expect(validateQueryValue('1000,100', [8])).toEqual([100,1000])
  })

  test('value1 cannot be smaller then defaults[0]', () => {
    expect(validateQueryValue('10,100', [20, 80])).toEqual([20,80])
  })

  test('value2 cannot be smaller then defaults[0]', () => {
    expect(validateQueryValue('10,10', [20, 80])).toEqual([20,20])
  })

  test('value1 cannot be larger then defaults[1]', () => {
    expect(validateQueryValue('100,100', [80, 80])).toEqual([80,80])
  })

  test('value2 cannot be larger then defaults[1]', () => {
    expect(validateQueryValue('20,100', [20, 80])).toEqual([20,80])
  })

  test('the function works', () => {
    expect(validateQueryValue('10,90', [20, 80])).toEqual([20,80])
    expect(validateQueryValue('20,80', [20, 80])).toEqual([20,80])
    expect(validateQueryValue('30,70', [20, 80])).toEqual([30,70])
    expect(validateQueryValue('40,60', [20, 80])).toEqual([40,60])
    expect(validateQueryValue('50,50', [20, 80])).toEqual([50,50])
    expect(validateQueryValue('60,40', [20, 80])).toEqual([40,60])
    expect(validateQueryValue('70,30', [20, 80])).toEqual([30,70])
    expect(validateQueryValue('80,20', [20, 80])).toEqual([20,80])
    expect(validateQueryValue('90,10', [20, 80])).toEqual([20,80])
  })

})