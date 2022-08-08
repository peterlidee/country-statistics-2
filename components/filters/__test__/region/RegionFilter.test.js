import { render, screen } from '@testing-library/react'
import { toBeInTheDocument } from '@testing-library/jest-dom'
import userEvent from '@testing-library/user-event'

import { RegionFilterContextProvider } from '../../../context/RegionFilterContext'
import { FieldsContextProvider } from '../../../context/FieldsContext'
import filterDataMock from '../../../../__mock__/data/filterDataMock'
import RegionFilter from '../../region/RegionFilter'
import FilterBlockRegion from '../../region/FilterBlockRegion'
import FilterRow from '../../region/FilterRow'

jest.mock('../../region/FilterBlockRegion')
jest.mock('../../region/FilterRow')

describe('components/filters/region/RegionFilter', () => {
  test('It renders', () => {
    render(
      <FieldsContextProvider>
        <RegionFilterContextProvider
          defaultRegionState={filterDataMock.defaultRegionState}
        >
          <RegionFilter regionIndexes={filterDataMock.regionIndexes} />
        </RegionFilterContextProvider>
      </FieldsContextProvider>
    )
    expect(FilterBlockRegion).toHaveBeenCalledTimes(4)
    const calls = FilterBlockRegion.mock.calls
    expect(calls[0][0].name).toBe('Africa')
    expect(calls[1][0].name).toBe('Americas')
    expect(calls[2][0].name).toBe('Antarctic')
    expect(calls[3][0].name).toBe('Europe')
    expect(screen.getByRole('button', { name: /clear/i })).toBeInTheDocument()
  })

  test('It resets on button clear', async () => {
    const User = userEvent.setup()
    // reset mock calls
    FilterBlockRegion.mockClear()
    render(
      <FieldsContextProvider>
        <RegionFilterContextProvider
          defaultRegionState={filterDataMock.defaultRegionState}
        >
          <RegionFilter regionIndexes={filterDataMock.regionIndexes} />
        </RegionFilterContextProvider>
      </FieldsContextProvider>
    )
    const button = screen.getByRole('button', { name: /clear/i })
    await User.click(button)
    // TODO don't know how to test this
    // expect(FilterBlockRegion.mock.calls[0][0]).toHaveProperty('active', false) ????
  })
})