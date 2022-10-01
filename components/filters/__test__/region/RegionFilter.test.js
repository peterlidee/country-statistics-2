import { render, screen } from '@testing-library/react'
import { toBeInTheDocument } from '@testing-library/jest-dom'
import userEvent from '@testing-library/user-event'

import filterDataMock from '../../../../__mock__/data/filterDataMock'
import { useRouter } from 'next/router'
import { RegionFilterContextProvider2 } from '../../../context/RegionFilterContext2'

import RegionFilter from '../../region/RegionFilter'
import FilterBlockRegion from '../../region/FilterBlockRegion'
import FilterRow from '../../region/FilterRow'

jest.mock('next/router', () => ({
  useRouter: jest.fn()
}))
const pushMock = jest.fn()
jest.mock('../../region/FilterBlockRegion', () => {
  return jest.fn((props) => <>{props.children}</>)
})
jest.mock('../../region/FilterRow')

describe('components/filters/region/RegionFilter', () => {

  test('It renders', () => {
    useRouter.mockReturnValue({
      query: {},
      // push: pushMock()
    })
    render(
      <RegionFilterContextProvider2
        filterData={filterDataMock}
      >
        <RegionFilter/>
      </RegionFilterContextProvider2>
    )
    expect(FilterBlockRegion).toHaveBeenCalledTimes(4)
    expect(FilterBlockRegion).toHaveBeenNthCalledWith(1, 
      expect.objectContaining({
        name: 'Africa',
        region: undefined,
        activeRegions: [],
        count: 1,
        hasSubFilter: true,
      }),
      expect.anything()
    )
    expect(FilterBlockRegion).toHaveBeenNthCalledWith(2, 
      expect.objectContaining({
        name: 'Americas',
        region: undefined,
        activeRegions: [],
        count: 1,
        hasSubFilter: true,
      }),
      expect.anything()
    )
    expect(FilterBlockRegion).toHaveBeenNthCalledWith(3, 
      expect.objectContaining({
        name: 'Antarctic',
        region: undefined,
        activeRegions: [],
        count: 1,
        hasSubFilter: false,
      }),
      expect.anything()
    )
    expect(FilterBlockRegion).toHaveBeenNthCalledWith(4, 
      expect.objectContaining({
        name: 'Europe',
        region: undefined,
        activeRegions: [],
        count: 3,
        hasSubFilter: true,
      }),
      expect.anything()
    )

    expect(FilterRow).toHaveBeenCalledTimes(5)
    expect(FilterRow).toHaveBeenNthCalledWith(1, 
      expect.objectContaining({
        name: 'Northern Africa',
        region: 'Africa',
        activeRegions: [],
        count: 1,
      }),
      expect.anything()
    )
    expect(FilterRow).toHaveBeenNthCalledWith(2, 
      expect.objectContaining({
        name: 'Caribbean',
        region: 'Americas',
        activeRegions: [],
        count: 1,
      }),
      expect.anything()
    )
    expect(FilterRow).toHaveBeenNthCalledWith(3, 
      expect.objectContaining({
        name: 'Central Europe',
        region: 'Europe',
        activeRegions: [],
        count: 1,
      }),
      expect.anything()
    )
    expect(FilterRow).toHaveBeenNthCalledWith(4, 
      expect.objectContaining({
        name: 'Northern Europe',
        region: 'Europe',
        activeRegions: [],
        count: 1,
      }),
      expect.anything()
    )
    expect(FilterRow).toHaveBeenNthCalledWith(5, 
      expect.objectContaining({
        name: 'Western Europe',
        region: 'Europe',
        activeRegions: [],
        count: 1,
      }),
      expect.anything()
    )
    expect(screen.getByRole('button', { name: /clear/i })).toBeInTheDocument()
  })

  test('The button calls router.push correctly', async () => {
    useRouter.mockReturnValue({
      query: { regions: 'Europe,Americas', sort: '-country' },
      push: pushMock
    })
    const User = userEvent.setup()
    render(
      <RegionFilterContextProvider2
        filterData={filterDataMock}
      >
        <RegionFilter/>
      </RegionFilterContextProvider2>
    )
    const button = screen.getByRole('button', { name: /clear/i })
    await User.click(button)
    expect(pushMock).toHaveBeenCalledWith(
      expect.objectContaining({
        path: '/',
        query: { sort: '-country' }
      }),
      undefined,
      { shallow: true }
    )
  })

})