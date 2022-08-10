import { screen, render } from '@testing-library/react'
import { toBeInTheDocument } from '@testing-library/jest-dom'

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
})