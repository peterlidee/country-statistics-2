import { screen, render } from '@testing-library/react'
import { toBeInTheDocument } from '@testing-library/jest-dom'
import Country from '../../pages/country/[countryCode]'
import SingleCountry from "../../components/single/SingleCountry"

jest.mock('../../components/single/SingleCountry', () => {
  return jest.fn(() => <div data-testid='SingleCountry' />)
})

describe('pages/country/[countryCode]', () => {
  it('Renders the SingleCountry mock', () => {
    render(<Country />)
    expect(screen.getByTestId('SingleCountry')).toBeInTheDocument()
  })
  it('Passes the correct props to SingleCountry mock child', () => {
    render(<Country country="country" countryCode="countryCode" singleEndpoint="singleEndpoint" />)
    expect(SingleCountry).toHaveBeenCalledWith(
      expect.objectContaining({
        "country": "country", 
        "countryCode": "countryCode", 
        "singleEndpoint": "singleEndpoint",
      }), expect.anything()
    )
  })
})