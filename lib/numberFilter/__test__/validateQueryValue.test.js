import validateQueryValue from '../validateQueryValue'

describe('function validateQueryValue', () => {
  
  test('It returns defaults when !queryValue', () => {
    expect(validateQueryValue(undefined, [1])).toEqual([1])
    expect(validateQueryValue('', [2])).toEqual([2])
    expect(validateQueryValue(0, [3])).toEqual([3])
  })

  test('It returns defaults when no komma', () => {
    expect(validateQueryValue('123', [4])).toEqual([4])
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

