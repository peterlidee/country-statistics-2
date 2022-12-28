import validateNumbersAgainstDefaults from '../validateNumbersAgainstDefaults'

describe('function validateNumbersAgainstDefaults', () => {

  test('It returns default when !value1 and/or !value2', () => {
    expect(validateNumbersAgainstDefaults(undefined, 2, [0,100])).toEqual([0,100])
    expect(validateNumbersAgainstDefaults("", 2, [0,100])).toEqual([0,100])
    expect(validateNumbersAgainstDefaults(1, undefined, [0,100])).toEqual([0,100])
    expect(validateNumbersAgainstDefaults(1, "", [0,100])).toEqual([0,100])
    expect(validateNumbersAgainstDefaults(undefined, undefined, [0,100])).toEqual([0,100])
    expect(validateNumbersAgainstDefaults(undefined, "", [0,100])).toEqual([0,100])
    expect(validateNumbersAgainstDefaults("", "", [0,100])).toEqual([0,100])
  })

  test('It returns values when both are defined', () => {
    expect(validateNumbersAgainstDefaults(30, 70, [0,100])).toEqual([30,70])
  })

  test('It returns defaults when one or both of the values are not a number', () => {
    expect(validateNumbersAgainstDefaults(123, 'aaa', [0,100])).toEqual([0,100])
    expect(validateNumbersAgainstDefaults('aaa', 123, [0,100])).toEqual([0,100])
    expect(validateNumbersAgainstDefaults('123', '456', [0,100])).toEqual([0,100])
    expect(validateNumbersAgainstDefaults('aaa', 'bbb123', [0,100])).toEqual([0,100])
  })

  test('It does not consider 0 tobe falsy', () => {
    expect(validateNumbersAgainstDefaults(0, 50, [0,100])).toEqual([0,50])
    expect(validateNumbersAgainstDefaults(0, 0, [0,100])).toEqual([0,0])
  })

  test('It returns values when both are numbers', () => {
    expect(validateNumbersAgainstDefaults(30, 70, [0,100])).toEqual([30,70])
  })

  test('If value1 < value2, return them', () => {
    expect(validateNumbersAgainstDefaults(30, 70, [0, 100])).toEqual([30,70])
  })

  test('If value1 > value2, flip them around', () => {
    expect(validateNumbersAgainstDefaults(70, 30, [0, 100])).toEqual([30,70])
  })

  test('value1 cannot be smaller then defaults[0]', () => {
    expect(validateNumbersAgainstDefaults(0, 90, [10, 100])).toEqual([10,90])
  })

  test('value2 cannot be smaller then defaults[0]', () => {
    expect(validateNumbersAgainstDefaults(0, 0 , [10, 100])).toEqual([10,10])
  })

  test('value1 cannot be larger then defaults[1]', () => {
    expect(validateNumbersAgainstDefaults(100, 100, [0, 90])).toEqual([90,90])
  })

  test('value2 cannot be larger then defaults[1]', () => {
    expect(validateNumbersAgainstDefaults(20, 100, [0, 90])).toEqual([20,90])
  })

  test('value1 and value2 are accepted even if defaults are equal', () => {
    expect(validateNumbersAgainstDefaults(50, 50, [50, 50])).toEqual([50,50])
    expect(validateNumbersAgainstDefaults(0, 0, [0, 0])).toEqual([0,0])
  })

})