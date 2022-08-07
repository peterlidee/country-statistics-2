// we need to test if the dispatch function works correctly
// in order to do this, we build a testing component outside of a 

import { reducer, initialState } from '../FieldsContext'

describe('function reducer', () => {
  test('It sorts correctly', () => {
    // [1] first reducer call
    const result = reducer(
      initialState,
      { type: 'sort', index: 1, }
    )
    
    // old active field is now inactive
    expect(result[0].sortActive).toBe(false)
    // default sortAsc
    expect(result[0].sortAsc).toBe(true)

    // new active field is active
    expect(result[1].sortActive).toBe(true)
    // default sortAsc
    expect(result[1].sortAsc).toBe(false)
    
    // [2] second reducer call
    // we call reducer again with same action, but with result of previous call (not with initial state)
    const result2 = reducer(
      result, 
      { type: 'sort', index: 1, } 
    )
    // expect the sortAsc to be reverse sortDefault
    expect(result2[1].sortAsc).toBe(true)

    // [3] third reducer call
    // we set sort on density (index 3), calling result2
    const result3 = reducer(
      result2, 
      { type: 'sort', index: 3, }
    )
    // expect index 1 (previous) to be reset
    expect(result3[1].sortActive).toBe(false)
    expect(result3[1].sortAsc).toBe(false)
    // expect new index 3 to be active
    expect(result3[3].sortActive).toBe(true)
    expect(result3[3].sortAsc).toBe(false)

    // [4] and [5] fourth and fifth calls to reducer
    const result4 = reducer(
      result3, { type: 'sort', index: 2, }
    )
    const result5 = reducer(
      result4, { type: 'sort', index: 2, }
    )
    // expect field with index 2 (area) to be active and reverse sorted
    expect(result5[2].sortActive).toBe(true)
    expect(result5[2].sortAsc).toBe(true)
    // expect all other fields to be inactive and default sorted
    expect(result5[0].sortActive).toBe(false)
    expect(result5[1].sortActive).toBe(false)
    expect(result5[3].sortActive).toBe(false)
    expect(result5[0].sortAsc).toBe(true)
    expect(result5[1].sortAsc).toBe(false)
    expect(result5[3].sortAsc).toBe(false)
  })

  test('It handles display correctly', () => {
    const result1 = reducer(
      initialState, 
      { type: 'display', index: 3 }
    )
    expect(result1[0].display).toBe(true)
    expect(result1[1].display).toBe(true)
    expect(result1[2].display).toBe(true)
    expect(result1[3].display).toBe(false)
    const result2 = reducer(
      result1, 
      { type: 'display', index: 3 }
    )
    expect(result2[0].display).toBe(true)
    expect(result2[1].display).toBe(true)
    expect(result2[2].display).toBe(true)
    expect(result2[3].display).toBe(true)
    const result3 = reducer(
      result2, 
      { type: 'display', index: 1 }
    )
    expect(result3[0].display).toBe(true)
    expect(result3[1].display).toBe(false)
    expect(result3[2].display).toBe(true)
    expect(result3[3].display).toBe(true)
  })
})