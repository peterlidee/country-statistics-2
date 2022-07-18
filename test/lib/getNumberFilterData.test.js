import { 
  getMinAndMax,
  closestRoundish,
  stepsNeeded,
  selectOptimalSteps,
  calculateNumberSliderSetting,

} from '../../lib/getNumberFilterData'

describe('function getMinMax', () => {
  test('It returns the minimum and maximum data out of an array', () => {
    const test1 = [1,2,3,4,5,6]
    const test2 = [6,5,4,3,2,1]
    const test3 = [1,1,1,1,1,1]
    expect(getMinAndMax(test1)).toEqual({min: 1, max: 6})
    expect(getMinAndMax(test2)).toEqual({min: 1, max: 6})
    expect(getMinAndMax(test3)).toEqual({min: 1, max: 1})
  })
  test('It does not return negative values', () => {
    expect(getMinAndMax([-3, 1]).min).not.toEqual(-3)
  })
  test('It returns 0 instead of negative value', () => {
    expect(getMinAndMax([-3, 1]).min).toEqual(0)
  })
})

describe('function closestRoundish', () => {
  test('It returns 5 roundish numbers', () => {
    expect(closestRoundish(36)).toEqual([10,25,50,75,100])
    expect(closestRoundish(2354)).toEqual([1000,2500,5000,7500,10000])
  })
  test('It returns [1,5,10] for values below 10', () => {
    expect(closestRoundish(9)).toEqual([1,5,10])
  })
})

describe('function stepsNeeded', () => {
  test('It returns the correct number of steps', () => {
    expect(stepsNeeded(10, 0, 100)).toBe(10)
    expect(stepsNeeded(5, 0, 100)).toBe(20)
  })
})

describe('function selectOptimalSteps', () => {
  test('It returns the index of the optimal number',() => {
    const optionsArr = [1,10,25,100,1000,250,150,75,3,2,12]
    expect(selectOptimalSteps(optionsArr,66)).toBe(7)
    expect(selectOptimalSteps(optionsArr,4)).toBe(8)
    expect(selectOptimalSteps(optionsArr,2.4)).toBe(9)
    expect(selectOptimalSteps(optionsArr,350)).toBe(5)
  })
})

describe('function calculateNumberSliderSetting', () => {
  
  const test1 = calculateNumberSliderSetting(100,1000,20)
  const test2 = calculateNumberSliderSetting(38,113500,20)
  
  test('It returns the correct sliderStart', () => {
    expect(test1.sliderStart).toBe(100)
    expect(test2.sliderStart).toBe(0)
  })
  test('It returns the correct sliderEnd', () => {
    expect(test1.sliderEnd).toBe(1000)
    expect(test2.sliderEnd).toBe(115000)
  })
  test('It returns the correct sliderStep', () => {
    expect(test1.sliderStep).toBe(50)
    expect(test2.sliderStep).toBe(5000)
  })
  test('It returns min param as countryMin and max as countryMax', () => {
    expect(test1.countryMin).toBe(100)
    expect(test2.countryMin).toBe(38)
    expect(test1.countryMax).toBe(1000)
    expect(test2.countryMax).toBe(113500)
  })
})

