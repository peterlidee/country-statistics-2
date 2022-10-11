import { screen, render } from '@testing-library/react'

import FilterRow from '../../region/FilterRow'
import FilterCheckBox from '../../region/FilterCheckbox'

jest.mock('../../region/FilterCheckbox')
const ChildMock = jest.fn()

describe('components/filters/region/FilterRow', () => {

  test('It renders', () => {
    render(
      <FilterRow 
        name="name"
        activeRegions={[]} 
        region={undefined}
        count={"count"} />
    )
    expect(FilterCheckBox).toHaveBeenCalledWith(
      expect.objectContaining({
        name: 'name', 
        activeRegions: [],
        region: undefined,
      }),
      expect.anything()
    )
    expect(screen.getByText(/count/i)).toBeInTheDocument()
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