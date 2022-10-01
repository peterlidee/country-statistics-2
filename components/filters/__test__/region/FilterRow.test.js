import { screen, render } from '@testing-library/react'
import { toBeInTheDocument } from '@testing-library/jest-dom'

import FilterRow from '../../region/FilterRow'
import FilterCheckBox from '../../region/FilterCheckbox'

jest.mock('../../region/FilterCheckbox')
const ChildMock = jest.fn()

describe('components/filters/region/FilterRow', () => {

  test('It renders', () => {
    const { container } = render(
      <FilterRow 
        name="name"
        activeRegions={[]} 
        region={undefined}
        count={1} />
    )
    expect(container.querySelector('.filter__row')).toBeInTheDocument()
    expect(FilterCheckBox).toHaveBeenCalledWith(
      expect.objectContaining({
        name: 'name', 
        activeRegions: [],
        region: undefined,
      }),
      expect.anything()
    )
    expect(container.querySelector('.filtercheckbox__count')).toBeInTheDocument()
    expect(container.querySelector('.filtercheckbox__count-inner')).toHaveTextContent('1')
  })

  test('it renders the child', () => {
    render(
      <FilterRow 
        name="name"
        activeRegions={[]} 
        region={undefined}
        count={1}>
          <ChildMock />
      </FilterRow>
    )
    expect(ChildMock).toHaveBeenCalledTimes(1)
  })

})