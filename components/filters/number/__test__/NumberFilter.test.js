import { screen, render } from '@testing-library/react'
import { toBeInTheDocument } from '@testing-library/jest-dom'
import userEvent from '@testing-library/user-event'

import NumberFilter from '../../number/NumberFilter'
import { useRouter } from 'next/router'
import FilterRange from '../../number/FilterRange'
import filterDataMock from '../../../../__mock__/data/filterDataMock'

jest.mock('next/router', () => ({
  useRouter: jest.fn()
}))
jest.mock('../../number/FilterRange')
const mockPush = jest.fn()

beforeEach(() => {
  jest.clearAllMocks()
})

const setupRender = () => {
  const { container } = render(
    <NumberFilter 
      filter={'density'} 
      currFilterData={filterDataMock['density']} />
  )
  const inputMin = screen.getByRole('spinbutton', { name: 'from' })
  const inputMax = screen.getByRole('spinbutton', { name: 'to' })
  const submitButton = screen.getByRole('button', { name: '>' })
  const clearButton = screen.getByRole('button', { name: 'clear' })
  return {
    container, inputMin, inputMax, submitButton, clearButton
  }
}

describe('components/filters/number/NumberFilter', () => {
  test('It renders', () => {
    useRouter.mockReturnValue({
      query: {},
      push: () => {}
    })
    const { container, inputMin, inputMax, submitButton, clearButton } = setupRender()

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
    expect(inputMin).toBeInTheDocument()
    expect(inputMin).toHaveValue(0)
    expect(inputMax).toBeInTheDocument()
    expect(inputMax).toHaveValue(400)
    expect(submitButton).toBeInTheDocument()
    expect(clearButton).toBeInTheDocument()
  })

  test('It populates the values from query', () => {
    useRouter.mockReturnValue({
      query: { density: '100,200' },
      push: () => {}
    })
    const { inputMin, inputMax } = setupRender()
    expect(inputMin).toHaveValue(100)
    expect(inputMax).toHaveValue(200)
  })

  test('Controls work', async () => {
    useRouter.mockReturnValue({
      query: {},
      push: mockPush,
    })
    const { inputMin, inputMax, submitButton, clearButton } = setupRender()
    const User = userEvent.setup()

    // enter a string (number) in from field
    await User.type(inputMin, '100')
    expect(inputMin).toHaveValue(100)
    
    // another number
    await User.clear(inputMin)
    await User.type(inputMin, '200')
    expect(inputMin).toHaveValue(200)
    
    // fails to set negative number
    await User.clear(inputMin)
    await User.type(inputMin, '-200')
    expect(inputMin).not.toHaveValue(-200)
    expect(inputMin).toHaveValue(200)

    // on submit, 
    // the values should remain
    await User.clear(inputMin)
    await User.type(inputMin, '100')
    await User.clear(inputMax)
    await User.type(inputMax, '300')
    await User.click(submitButton)
    expect(inputMin).toHaveValue(100)
    expect(inputMax).toHaveValue(300)

    // router.push has been called correctly
    expect(mockPush).toHaveBeenLastCalledWith(
      expect.objectContaining({
        query: { density: '100,300' }
      }),
      undefined,
      { shallow: true }
    )

    // on submit, 
    // if TO is smaller then FROM, then the values will be flipped
    await User.clear(inputMin)
    await User.type(inputMin, '300')
    await User.clear(inputMax)
    await User.type(inputMax, '100')
    await User.click(submitButton)
    expect(inputMin).toHaveValue(100)
    expect(inputMax).toHaveValue(300)

    // on submit, 
    // is TO is higher then max, it gets corrected to max
    await User.clear(inputMax)
    await User.type(inputMax, '500')
    await User.click(submitButton)
    expect(inputMin).toHaveValue(100)
    expect(inputMax).toHaveValue(400)

    // FilterInput was called each time with updated values
    // we check the last call
    const filterRangeCalls = FilterRange.mock.calls
    expect(filterRangeCalls[filterRangeCalls.length - 1][0].sliderSelection[0]).toBe(100)
    expect(filterRangeCalls[filterRangeCalls.length - 1][0].sliderSelection[1]).toBe(400)

    // check if clearbutton works
    await User.click(clearButton)
    expect(inputMin).toHaveValue(0)
    expect(inputMax).toHaveValue(400)

    // router.push has been called correctly
    expect(mockPush).toHaveBeenLastCalledWith(
      expect.objectContaining({
        query: { density: '0,400' }
      }),
      undefined,
      { shallow: true }
    )
  })
  
})