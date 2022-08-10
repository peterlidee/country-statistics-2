import { screen, render } from '@testing-library/react'
import { toBeInTheDocument } from '@testing-library/jest-dom'

import FilterRange from '../../number/FilterRange'
import { Range } from 'react-range'

jest.mock('react-range', () => {
  return({ Range: jest.fn() })
})

describe('components/filters/number/FilterRange', () => {
  test('It renders', () => {
    const { container } = render(<FilterRange 
      min={0}
      max={100}
      steps={10}
      sliderSelection={[0,100]} 
      handleSliderSelection={() => {}}
      sliderFinalSelection={[0,100]} 
      handleSliderFinalSelection={() => {}} />
    )
    expect(container.querySelector('div')).toBeInTheDocument()
    expect(Range).toHaveBeenCalled()
    // not sure how to test the rest ...
  })
})