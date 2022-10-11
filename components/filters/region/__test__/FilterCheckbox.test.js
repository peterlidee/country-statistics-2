import { screen, render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import { useRouter } from 'next/router'
import FilterCheckBox from '../../region/FilterCheckbox'
import { RegionFilterContextProvider } from '../../../context/RegionFilterContext'
import filterDataMock from '../../../../__mock__/data/filterDataMock'

jest.mock('next/router', () => ({
  useRouter: jest.fn()
}))
const mockPush = jest.fn()
useRouter.mockReturnValue({
  push: mockPush,
})

describe('components/filters/region/FilterCheckBox', () => {
  
  test('It renders', () => {
    render(
      <FilterCheckBox 
        name="name"
        region={undefined}
        activeRegions={[]}
      />
    )
    expect(screen.getByRole('checkbox', { name: 'name' })).toBeInTheDocument()
    expect(screen.getByRole('checkbox', { name: 'name' })).not.toBeChecked()
  })

  test('It renders checked when activeRegions == props.name', () => {
    render(   
      <FilterCheckBox 
        name="name"
        region={undefined}
        activeRegions={["name"]} />
    )
    expect(screen.getByRole('checkbox', { name: 'name' })).toBeChecked()
  })

})

describe('It calls router.push with the correct props', () => {

  beforeEach(() => {
    mockPush.mockClear()
  })

  test('A click on a subregion that is active and region is also active [1.1.1]', async () => {
    render(
      <RegionFilterContextProvider filterData={filterDataMock}>
        <FilterCheckBox 
          name="Northern Europe"
          region={"Europe"}
          activeRegions={['Northern Europe','Western Europe','Europe','Central Europe']} />
      </RegionFilterContextProvider>
    )
    const User = userEvent.setup()
    const checkBoxEl = screen.getByRole('checkbox', { name: 'Northern Europe' })
    await User.click(checkBoxEl)
    expect(mockPush).toHaveBeenCalledWith(
      expect.objectContaining({
        query: expect.objectContaining({
          regions: 'Western Europe,Central Europe'
        })
      }),
      undefined,
      expect.anything()
    )
  })

  test('A click on a subregion that is active and region is not active [1.1.2]', async () => {
    render(
      <RegionFilterContextProvider filterData={filterDataMock}>
        <FilterCheckBox 
          name="Northern Europe"
          region={"Europe"}
          activeRegions={['Northern Europe','Southeast Europe','Europe','Central Europe']} />
      </RegionFilterContextProvider>
    )
    const User = userEvent.setup()
    const checkBoxEl = screen.getByRole('checkbox', { name: 'Northern Europe' })
    await User.click(checkBoxEl)
    expect(mockPush).toHaveBeenCalledWith(
      expect.objectContaining({
        query: expect.objectContaining({
          regions: 'Southeast Europe,Central Europe'
        })
      }),
      undefined,
      expect.anything()
    )
  })

  test('A click on a subregion that is not active and all the other subregions are active [1.2.1]', async () => {
    render(
      <RegionFilterContextProvider filterData={filterDataMock}>
        <FilterCheckBox 
          name="Central Europe"
          region={"Europe"}
          activeRegions={['Northern Europe', 'Western Europe']} />
      </RegionFilterContextProvider>
    )
    const User = userEvent.setup()
    const checkBoxEl = screen.getByRole('checkbox', { name: 'Central Europe' })
    await User.click(checkBoxEl)
    expect(mockPush).toHaveBeenCalledWith(
      expect.objectContaining({
        query: expect.objectContaining({
          regions: 'Northern Europe,Western Europe,Europe,Central Europe'
        })
      }),
      undefined,
      expect.anything()
    )
  })

  test('A click on a subregion that is not active and NOT all the other subregions are active [1.2.2]', async () => {
    render(
      <RegionFilterContextProvider filterData={filterDataMock}>
        <FilterCheckBox 
          name="Northern Europe"
          region={"Europe"}
          activeRegions={['Southeast Europe','Central Europe']} />
      </RegionFilterContextProvider>
    )
    const User = userEvent.setup()
    const checkBoxEl = screen.getByRole('checkbox', { name: 'Northern Europe' })
    await User.click(checkBoxEl)
    expect(mockPush).toHaveBeenCalledWith(
      expect.objectContaining({
        query: expect.objectContaining({
          regions: 'Southeast Europe,Central Europe,Northern Europe'
        })
      }),
      undefined,
      expect.anything()
    )
  })

  test('A click on a region that is active [2.1]', async () => {
    render(
      <RegionFilterContextProvider filterData={filterDataMock}>
        <FilterCheckBox 
          name="Africa"
          region={undefined}
          activeRegions={["Africa"]} />
      </RegionFilterContextProvider>
    )
    const User = userEvent.setup()
    const checkBoxEl = screen.getByRole('checkbox', { name: 'Africa' })
    await User.click(checkBoxEl)
    expect(mockPush).toHaveBeenCalledWith(
      expect.objectContaining({
        path: '/',
        query: expect.objectContaining({
          regions: ''
        })
      }),
      undefined,
      expect.anything()
    )
  })

  test('A click on a region that is not active [2.2]', async () => {
    render(
      <RegionFilterContextProvider filterData={filterDataMock}>
        <FilterCheckBox 
          name="Africa"
          region={undefined}
          activeRegions={[]} />
      </RegionFilterContextProvider>
    )
    const User = userEvent.setup()
    const checkBoxEl = screen.getByRole('checkbox', { name: 'Africa' })
    await User.click(checkBoxEl)
    expect(mockPush).toHaveBeenCalledWith(
      expect.objectContaining({
        path: '/',
        query: expect.objectContaining({
          regions: 'Africa,Northern Africa'
        })
      }),
      undefined,
      expect.anything()
    )
  })

})