import { screen, render } from '@testing-library/react'
import { toBeInTheDocument } from '@testing-library/jest-dom'
import userEvent from '@testing-library/user-event'

import filterDataMock from '../../../../__mock__/data/filterDataMock'
import {FieldsContextProvider } from '../../../context/FieldsContext'
import { NumberFiltersContextProvider } from '../../../context/NumberFiltersContext'
import NumberFilter from '../../number/NumberFilter'
import FilterRange from '../../number/FilterRange'

jest.mock('../../number/FilterRange')

describe('components/filters/number/NumberFilter', () => {
  test('It renders', () => {
    const { container } = render(
      <FieldsContextProvider>
        <NumberFiltersContextProvider filterData={filterDataMock}>
          <NumberFilter 
            filter={'density'} 
            currFilterData={filterDataMock['density']} />
        </NumberFiltersContextProvider>
      </FieldsContextProvider>
    )
    expect(container.querySelector('.filter')).toBeInTheDocument()
    expect(container.querySelector('.filter__block__number')).toBeInTheDocument()
    expect(FilterRange).toHaveBeenCalledWith(
      expect.objectContaining({
        min: 0,
        max: 400,
        steps: 25,
        sliderSelection: [0,400],
        sliderFinalSelection: [0,400],
      }),
      expect.anything()
    )
    expect(container.querySelector('.number-filter__input-grid')).toBeInTheDocument()
    expect(container.querySelectorAll('.number-filter__input-grid-item')).toHaveLength(2)
    expect(screen.getByRole('spinbutton', { name: 'from' })).toBeInTheDocument()
    expect(screen.getByRole('spinbutton', { name: 'to' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: '>' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'clear' })).toBeInTheDocument()
  })

  test('Controls work', async () => {
    render(
      <FieldsContextProvider>
        <NumberFiltersContextProvider filterData={filterDataMock}>
          <NumberFilter 
            filter={'density'} 
            currFilterData={filterDataMock['density']} />
        </NumberFiltersContextProvider>
      </FieldsContextProvider>
    )
    const User = userEvent.setup()
    const inputFrom = screen.getByRole('spinbutton', { name: 'from' })
    const inputTo = screen.getByRole('spinbutton', { name: 'to' })
    const submitButton = screen.getByRole('button', { name: '>' })
    const clearButton = screen.getByRole('button', { name: 'clear' })

    // enter a string (number) in from field
    await User.type(inputFrom, '100')
    expect(inputFrom).toHaveValue(100)
    
    // another number
    await User.clear(inputFrom)
    await User.type(inputFrom, '200')
    expect(inputFrom).toHaveValue(200)
    
    // fails to set negative number
    await User.clear(inputFrom)
    await User.type(inputFrom, '-200')
    expect(inputFrom).not.toHaveValue(-200)
    expect(inputFrom).toHaveValue(200)

    // on submit, 
    // the values should remain
    await User.clear(inputFrom)
    await User.type(inputFrom, '100')
    await User.clear(inputTo)
    await User.type(inputTo, '300')
    await User.click(submitButton)
    expect(inputFrom).toHaveValue(100)
    expect(inputTo).toHaveValue(300)

    // on submit, 
    // if TO is smaller then FROM, then the values will be flipped
    await User.clear(inputFrom)
    await User.type(inputFrom, '300')
    await User.clear(inputTo)
    await User.type(inputTo, '100')
    await User.click(submitButton)
    expect(inputFrom).toHaveValue(100)
    expect(inputTo).toHaveValue(300)

    // on submit, 
    // is TO is higher then max, it gets corrected to max
    await User.clear(inputTo)
    await User.type(inputTo, '500')
    await User.click(submitButton)
    expect(inputFrom).toHaveValue(100)
    expect(inputTo).toHaveValue(400)

    // FilterInput was called each time with updated values
    // we check the last call
    const filterRangeCalls = FilterRange.mock.calls
    expect(filterRangeCalls[filterRangeCalls.length - 1][0].sliderSelection[0]).toBe(100)
    expect(filterRangeCalls[filterRangeCalls.length - 1][0].sliderSelection[1]).toBe(400)

    // check if clearbutton works
    await User.click(clearButton)
    expect(inputFrom).toHaveValue(0)
    expect(inputTo).toHaveValue(400)
  })
})