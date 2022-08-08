import { screen, render } from '@testing-library/react'
import { toBeInTheDocument } from '@testing-library/jest-dom'

import FilterRow from '../../region/FilterRow'
import FilterCheckBox from '../../region/FilterCheckbox'

jest.mock('../../region/FilterCheckbox')

describe('components/filters/region/FilterRow', () => {
  test('It renders', () => {
    const { container } = render(
      <FilterRow 
        name="name"
        active={true} 
        handler={() => {}} 
        count={1}>
        <div data-testid="ChildMock" />
      </FilterRow>
    )
    expect(container.querySelector('.filter__row')).toBeInTheDocument()
    expect(FilterCheckBox).toHaveBeenCalledWith(
      expect.objectContaining({
        label: 'name', active: true,
      }),
      expect.anything()
    )
    expect(container.querySelector('.filtercheckbox__count')).toBeInTheDocument()
    expect(container.querySelector('.filtercheckbox__count-inner')).toBeInTheDocument()
    expect(container.querySelector('.filtercheckbox__count-inner')).toHaveTextContent('1')
    expect(screen.getByTestId('ChildMock')).toBeInTheDocument()
  })
})