import { screen, render } from '@testing-library/react'

import { useRouter } from 'next/router'
import { RegionFilterContextProvider } from '../../context/RegionFilterContext'

import CountryList from '../CountryList'
import CountryCount from '../../header/CountryCount'
import Filters from '../../filters/Filters'
import CountryListHeaders from '../CountryListHeaders'
import CountryRow from '../CountryRow'

import { extraDataCountries } from '../../../__mock__/data/countriesMock'
import filterDataMock from '../../../__mock__/data/filterDataMock'

jest.mock('next/router', () => ({
  useRouter: jest.fn()
}))
jest.mock('../../header/CountryCount')
jest.mock('../../filters/Filters')
jest.mock('../CountryListHeaders')
jest.mock('../CountryRow')

beforeEach(() => {
  jest.clearAllMocks()
})

function setupRender(){
  render(
    <RegionFilterContextProvider filterData={filterDataMock}>
      <CountryList countries={extraDataCountries} filterData={filterDataMock} />
    </RegionFilterContextProvider>
  )
}
function setupReturnValue(query, ready = true){
  useRouter.mockReturnValue({
    isReady: ready,
    query: query,
  })
}

describe('components/countryList/CountryList', () => {
  
  test('It renders', () => {
    setupReturnValue({})
    setupRender()

    expect(CountryCount).toHaveBeenCalled()
    expect(Filters).toHaveBeenCalled()
    expect(screen.getByRole('main')).toBeInTheDocument()
    expect(CountryListHeaders).toHaveBeenCalled()
    expect(CountryRow).toHaveBeenCalledTimes(6)
  })
  
  test('It renders loading', () => {
    setupReturnValue({}, false)
    setupRender()
    expect(screen.getByText('...loading')).toBeInTheDocument()
  })

  test('Grid has the correct styles with none hidden', () => {
    setupReturnValue({})
    setupRender()
    expect(screen.getByRole('main')).toHaveStyle('gridTemplateColumns: 1.5em minmax(9em, 15em) repeat(3, minmax(auto, 9em))')
  })

  test('Grid has the correct styles with 1 hidden', () => {
    setupReturnValue({ hide: 'area' })
    setupRender()
    expect(screen.getByRole('main')).toHaveStyle('gridTemplateColumns: 1.5em minmax(9em, 15em) repeat(2, minmax(auto, 9em))')
  })

  test('Grid has the correct styles with all hidden', () => {
    setupReturnValue({ hide: 'area,population,density' })
    setupRender()
    expect(screen.getByRole('main')).toHaveStyle('gridTemplateColumns: 1.5em minmax(9em, 15em)')
  })

  test('It displays no results', () => {
    setupReturnValue({ area: '1,2' })    
    setupRender()
    expect(screen.getByText(/no results/i)).toBeInTheDocument()
  })

  test('CountryCount mock was called with correct props when all countries are displayed', () => {
    setupReturnValue({})
    setupRender()
    expect(CountryCount).toHaveBeenCalledWith(
      expect.objectContaining({
        count: 6
      }),
      expect.anything()
    )
  })

  test('CountryCount mock was called with correct props when filters active', () => {
    setupReturnValue({ area: '0,50000' })
    setupRender()
    expect(CountryCount).toHaveBeenLastCalledWith(
      expect.objectContaining({
        count: 4
      }),
      expect.anything()
    )
  })

  test('Filters was called with the correct hiddenFields props when nothing hidden', () => {
    setupReturnValue({})
    setupRender()
    expect(Filters).toHaveBeenLastCalledWith(
      expect.objectContaining({
        hiddenFields: []
      }),
      expect.anything()
    )
  })

  test('Filters was called with the correct hiddenFields props when area hidden', () => {
    setupReturnValue({ hide: 'area' })
    setupRender()
    expect(Filters).toHaveBeenLastCalledWith(
      expect.objectContaining({
        hiddenFields: [ 'area' ]
      }),
      expect.anything()
    )
  })

  test('CountryListHeaders gets called with the correct props when default', () => {
    setupReturnValue({})
    setupRender()
    expect(CountryListHeaders).toHaveBeenLastCalledWith(
      expect.objectContaining({
        sortBy: 'country',
        sortAsc: true
      }),
      expect.anything()
    )
  })

  test('CountryListHeaders gets called with the correct props when sort -density', () => {
    setupReturnValue({ sort: '-density' })
    setupRender()
    expect(CountryListHeaders).toHaveBeenLastCalledWith(
      expect.objectContaining({
        sortBy: 'density',
        sortAsc: false,
      }),
      expect.anything()
    )
  })

  test('CountryRow is called with correctly when default filter', () => {
    setupReturnValue({})
    setupRender()
    expect(CountryRow.mock.calls[0][0].country.cca3).toBe('AUT')
    expect(CountryRow.mock.calls[5][0].country.cca3).toBe('SGS')
  })

  test('CountryRow is called with correctly when default filter', () => {
    setupReturnValue({ population: '0,10000000' })
    setupRender()
    expect(CountryRow).toHaveBeenCalledTimes(4)
    expect(CountryRow.mock.calls[0][0].country.cca3).toBe('AUT')
    expect(CountryRow.mock.calls[1][0].country.cca3).toBe('DNK')
    expect(CountryRow.mock.calls[2][0].country.cca3).toBe('PRI')
    expect(CountryRow.mock.calls[3][0].country.cca3).toBe('SGS')
  })

})