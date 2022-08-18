import { render, screen } from '@testing-library/react'
import { toBeInTheDocument } from '@testing-library/jest-dom'

import Home from "../Home"
import Header from '../header/Header'
import CountryList from '../countryList/CountryList'
import Sources from '../sources/Sources'
import Source from '../sources/Source'

jest.mock('../header/Header')
jest.mock('../countryList/CountryList')
jest.mock('../sources/Sources', () => {
  return jest.fn((props) => <div data-testid="Sources">{props.children}</div>)
})
jest.mock('../sources/Source')

describe('components/Home', () => {
  test('It renders', () => {
    render(<Home endpoint="endpoint" countries={[]} />)

    expect(Header).toHaveBeenCalledWith(
      { 'home': true }, 
      expect.anything()
    )
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