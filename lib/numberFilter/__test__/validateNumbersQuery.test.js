import validateNumbersQuery from '../validateNumbersQuery'

describe('function validateNumbersQuery', () => {
  
  test('It returns defaults when !queryValue', () => {
    expect(validateNumbersQuery(undefined, [1])).toEqual([1])
    expect(validateNumbersQuery('', [2])).toEqual([2])
    expect(validateNumbersQuery(0, [3])).toEqual([3])
  })

  test('It returns defaults when no komma', () => {
    expect(validateNumbersQuery('123', [4])).toEqual([4])
  })
  
  test('the function works', () => {
    expect(validateNumbersQuery('10,90', [20, 80])).toEqual([20,80])
    expect(validateNumbersQuery('20,80', [20, 80])).toEqual([20,80])
    expect(validateNumbersQuery('30,70', [20, 80])).toEqual([30,70])
    expect(validateNumbersQuery('40,60', [20, 80])).toEqual([40,60])
    expect(validateNumbersQuery('50,50', [20, 80])).toEqual([50,50])
    expect(validateNumbersQuery('60,40', [20, 80])).toEqual([40,60])
    expect(validateNumbersQuery('70,30', [20, 80])).toEqual([30,70])
    expect(validateNumbersQuery('80,20', [20, 80])).toEqual([20,80])
    expect(validateNumbersQuery('90,10', [20, 80])).toEqual([20,80])
  })

})

