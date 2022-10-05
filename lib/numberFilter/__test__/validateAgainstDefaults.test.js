import validateAgainstDefaults from '../validateAgainstDefaults'

describe('function validateAgainstDefaults', () => {

  test('It returns default when !value1 and/or !value2', () => {
    expect(validateAgainstDefaults(undefined, 2, [0,100])).toEqual([0,100])
    expect(validateAgainstDefaults("", 2, [0,100])).toEqual([0,100])
    expect(validateAgainstDefaults(1, undefined, [0,100])).toEqual([0,100])
    expect(validateAgainstDefaults(1, "", [0,100])).toEqual([0,100])
    expect(validateAgainstDefaults(undefined, undefined, [0,100])).toEqual([0,100])
    expect(validateAgainstDefaults(undefined, "", [0,100])).toEqual([0,100])
    expect(validateAgainstDefaults("", "", [0,100])).toEqual([0,100])
  })

  test('It returns values when both are defined', () => {
    expect(validateAgainstDefaults(30, 70, [0,100])).toEqual([30,70])
  })

  test('It returns defaults when one or both of the values are not a number', () => {
    expect(validateAgainstDefaults(123, 'aaa', [0,100])).toEqual([0,100])
    expect(validateAgainstDefaults('aaa', 123, [0,100])).toEqual([0,100])
    expect(validateAgainstDefaults('123', '456', [0,100])).toEqual([0,100])
    expect(validateAgainstDefaults('aaa', 'bbb123', [0,100])).toEqual([0,100])
  })

  test('It does not consider 0 tobe falsy', () => {
    expect(validateAgainstDefaults(0, 50, [0,100])).toEqual([0,50])
    expect(validateAgainstDefaults(0, 0, [0,100])).toEqual([0,0])
  })

  test('It returns values when both are numbers', () => {
    expect(validateAgainstDefaults(30, 70, [0,100])).toEqual([30,70])
  })

  test('If value1 < value2, return them', () => {
    expect(validateAgainstDefaults(30, 70, [0, 100])).toEqual([30,70])
  })

  test('If value1 > value2, flip them around', () => {
    expect(validateAgainstDefaults(70, 30, [0, 100])).toEqual([30,70])
  })

  test('value1 cannot be smaller then defaults[0]', () => {
    expect(validateAgainstDefaults(0, 90, [10, 100])).toEqual([10,90])
  })

  test('value2 cannot be smaller then defaults[0]', () => {
    expect(validateAgainstDefaults(0, 0 , [10, 100])).toEqual([10,10])
  })

  test('value1 cannot be larger then defaults[1]', () => {
    expect(validateAgainstDefaults(100, 100, [0, 90])).toEqual([90,90])
  })

  test('value2 cannot be larger then defaults[1]', () => {
    expect(validateAgainstDefaults(20, 100, [0, 90])).toEqual([20,90])
  })

  test('value1 and value2 are accepted even if defaults are equal', () => {
    expect(validateAgainstDefaults(50, 50, [50, 50])).toEqual([50,50])
    expect(validateAgainstDefaults(0, 0, [0, 0])).toEqual([0,0])
  })

})