import { render, screen } from '@testing-library/react'
import { toBeInTheDocument } from '@testing-library/jest-dom'
import userEvent from '@testing-library/user-event'

import { RegionFilterContextProvider } from '../../../context/RegionFilterContext'
import filterDataMock from '../../../../__mock__/data/filterDataMock'
import RegionFilter from '../../region/RegionFilter'
import FilterBlockRegion from '../../region/FilterBlockRegion'
import FilterRow from '../../region/FilterRow'

jest.mock('../../region/FilterBlockRegion', () => {
  return jest.fn((props) => <>{props.children}</>)
})
jest.mock('../../region/FilterRow')

describe('components/filters/region/RegionFilter', () => {
  test('It renders', () => {
    render(
      <RegionFilterContextProvider
        defaultRegionState={filterDataMock.defaultRegionState}
      >
        <RegionFilter regionIndexes={filterDataMock.regionIndexes} />
      </RegionFilterContextProvider>
    )
    expect(FilterBlockRegion).toHaveBeenCalledTimes(4)
    expect(FilterBlockRegion.mock.calls[0][0].name).toBe('Africa')
    expect(FilterBlockRegion.mock.calls[1][0].name).toBe('Americas')
    expect(FilterBlockRegion.mock.calls[2][0].name).toBe('Antarctic')
    expect(FilterBlockRegion.mock.calls[3][0].name).toBe('Europe')
    expect(FilterRow).toHaveBeenCalledTimes(5)
    expect(FilterRow.mock.calls[0][0].name).toBe('Northern Africa')
    expect(FilterRow.mock.calls[1][0].name).toBe('Caribbean')
    expect(FilterRow.mock.calls[2][0].name).toBe('Central Europe')
    expect(FilterRow.mock.calls[3][0].name).toBe('Northern Europe')
    expect(FilterRow.mock.calls[4][0].name).toBe('Western Europe')
    expect(screen.getByRole('button', { name: /clear/i })).toBeInTheDocument()
  })
})