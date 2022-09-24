import { render, screen } from '@testing-library/react'
import { toBeInTheDocument } from '@testing-library/jest-dom'

import { FieldsContextProvider } from '../context/FieldsContext'
import { RegionFilterContextProvider } from '../context/RegionFilterContext'
import { NumberFiltersContextProvider } from '../context/NumberFiltersContext'
import Home from "../Home"
import Header from '../header/Header'
import CountryList from '../countryList/CountryList'
import Sources from '../sources/Sources'
import Source from '../sources/Source'

jest.mock('../context/FieldsContext', () => ({
  FieldsContextProvider: jest.fn(props => props.children)
}))
jest.mock('../header/Header')
jest.mock('../context/RegionFilterContext', () => ({
  RegionFilterContextProvider: jest.fn((props) => props.children)
}))
jest.mock('../context/NumberFiltersContext', () => ({
  NumberFiltersContextProvider: jest.fn(props => props.children)
}))
jest.mock('../countryList/CountryList')
jest.mock('../sources/Sources', () => {
  return jest.fn((props) => <div data-testid="Sources">{props.children}</div>)
})
jest.mock('../sources/Source')

describe('components/Home', () => {
  test('It renders', () => {
    render(
      <Home 
        endpoint="endpoint" 
        countries={[]} 
        filterData={{}} />
    )

    expect(FieldsContextProvider).toHaveBeenCalled()
    expect(Header).toHaveBeenCalledWith(
      { 'home': true }, 
      expect.anything()
    )
    expect(RegionFilterContextProvider).toHaveBeenCalled()
    expect(NumberFiltersContextProvider).toHaveBeenCalled()
    expect(CountryList).toHaveBeenCalledWith(
      expect.objectContaining({ 'countries': [] }), 
      expect.anything()
    )
    expect(screen.getByTestId('Sources')).toBeInTheDocument()
    expect(Sources).toHaveBeenCalled()
    expect(Source).toHaveBeenCalledWith({
      error: false,
      loading: false,
      endpoint: "endpoint",
      label: "restcountries.com/{all}",
    }, expect.anything())
  })
})