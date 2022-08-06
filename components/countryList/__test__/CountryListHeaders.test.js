import { screen, render } from '@testing-library/react'

import { FieldsContextProvider } from '../../context/FieldsContext'
import CountryListHeaders from '../CountryListHeaders'
import CountryListHeader from '../CountryListHeader'
import CountryListLegend from '../CountryListLegend'
import Wrapper from '../../general/Wrapper'

jest.mock('../../general/Wrapper', () => {
  return jest.fn((props) => <div className="Wrapper">{props.children}</div>)
})
jest.mock('../CountryListHeader')
jest.mock('../CountryListLegend')

describe('components/countryList/CountryListHeaders', () => {
  test('It renders', () => {
    render(
      <FieldsContextProvider>
        <CountryListHeaders />
      </FieldsContextProvider>
    )
    expect(Wrapper).toHaveBeenCalledTimes(2)
    expect(CountryListHeader).toHaveBeenCalledTimes(4)
    expect(CountryListLegend).toHaveBeenCalledTimes(4)
  })
})