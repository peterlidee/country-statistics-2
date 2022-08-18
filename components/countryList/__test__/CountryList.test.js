import { screen, render } from '@testing-library/react'
import {toBeInTheDocument } from '@testing-library/jest-dom'

import { FieldsContextProvider } from '../../context/FieldsContext'
import { NumberFiltersContextProvider } from '../../context/NumberFiltersContext'
import { RegionFilterContextProvider } from '../../context/RegionFilterContext'

import CountryList from '../CountryList'
import CountryCount from '../../header/CountryCount'
import Filters from '../../filters/Filters'
import CountryListHeaders from '../CountryListHeaders'
import CountryRow from '../CountryRow'

import countriesMock from '../../../__mock__/data/countriesMock'
import filterDataMock from '../../../__mock__/data/filterDataMock'

const { extraDataCountries } = countriesMock

jest.mock('../../header/CountryCount')
jest.mock('../../filters/Filters')
jest.mock('../CountryListHeaders')
jest.mock('../CountryRow')

describe('components/countryList/CountryList', () => {
  test('It renders', () => {
    const { container } = render(
      <FieldsContextProvider>
        <RegionFilterContextProvider defaultRegionState={filterDataMock.defaultRegionState}>
          <NumberFiltersContextProvider filterData={filterDataMock}>
            <CountryList countries={extraDataCountries} filterData={filterDataMock} />
          </NumberFiltersContextProvider>
        </RegionFilterContextProvider>
      </FieldsContextProvider>
    )

    expect(container.querySelector('.site__grid--home')).toBeInTheDocument()
    expect(CountryCount).toHaveBeenCalledWith(
      { count: 6 },
      expect.anything()
    )
    expect(Filters).toHaveBeenCalled()
    expect(CountryListHeaders).toHaveBeenCalled()
    expect(CountryRow).toHaveBeenCalledTimes(6)
    expect(CountryRow.mock.calls[0][0].country.cca3).toBe('AUT')
    expect(CountryRow.mock.calls[5][0].country.cca3).toBe('SGS')
  })
})