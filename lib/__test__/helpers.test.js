import { roundNumber, fillArrayWithBool } from '../helpers'

describe('function roundNumber', () => {
  test('It returns empty string when receiving empty string', () => {
    expect(roundNumber('')).toBe('')
  })
  test('It returns 0 when receiving negative number', () => {
    expect(roundNumber(-1)).toBe(0)
    expect(roundNumber(-100)).toBe(0)
  })
  test('It rounds numbers >= 0', () => {
    expect(roundNumber(0)).toBe(0)
    expect(roundNumber(0.4)).toBe(0)
    expect(roundNumber(0.5)).toBe(1)
    expect(roundNumber(1000.1)).toBe(1000)
    expect(roundNumber(1000.9)).toBe(1001)
  })
})

describe('function fillArrayWithBool', () => {
  test('It returns empty array when length = 0', () => {
    expect(fillArrayWithBool(0, true)).toEqual([])
  })
  test('It returns an array with same length as length parameter', () => {
    expect(fillArrayWithBool(0, true)).toHaveLength(0)
    expect(fillArrayWithBool(3, true)).toHaveLength(3)
    expect(fillArrayWithBool(6, true)).toHaveLength(6)
  })
  test('It returns an array filled with same boolean values', () => {
    const allTrue = fillArrayWithBool(3, true)
    expect(expect(allTrue.every(item => item)).toBe(true))
    const allFalse = fillArrayWithBool(3, false)
    expect(expect(allFalse.every(item => item)).toBe(false))
  })
})