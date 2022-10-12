import { screen, render } from '@testing-library/react'

import singleCountryMocks from '../../../../__mock__/data/singleCountryMocks'

import MapControles from '../MapControles'
import MapCapitalButton from '../MapCapitalButton'
import MapRegionButton from '../MapRegionButton'
import IconPan from '../../../svgSnippets/IconPan'

jest.mock('../MapCapitalButton')
jest.mock('../MapRegionButton')
jest.mock('../../../svgSnippets/IconPan')

const regionCountries = {
  isLoading: false,
  error: undefined,
  data: [],
  endpoint: 'regionCountriesEndpoint'
}
const subregionCountries = {
  isLoading: false,
  error: undefined,
  data: [],
  endpoint: 'subregionCountriesEndpoint'
}
const map = {}
const setCountryOnMap = jest.fn()
const setGeoCodeLoading = jest.fn()
const setGeoCodeError = jest.fn()

describe('components/single/map/MapControles', () => {

  test('It renders', () => {
    render(<MapControles 
      country={singleCountryMocks[0]} 
      map={map} 
      setCountryOnMap={setCountryOnMap}
      setGeoCodeLoading={setGeoCodeLoading}
      setGeoCodeError={setGeoCodeError}
      regionCountries={regionCountries}
      subregionCountries={subregionCountries} />
    )

    expect(MapCapitalButton).toHaveBeenCalledWith(
      expect.objectContaining({
        capital: 'Algiers',
        countryName: 'Algeria',
        subregion: 'Northern Africa',
        active: 'country',
      }),
      expect.anything()
    )
    expect(IconPan).toHaveBeenCalledWith(
      expect.objectContaining({ active: true }),
      expect.anything()
    )
    expect(screen.getByRole('button', { name: 'Algeria' })).toBeInTheDocument()
    expect(MapRegionButton).toHaveBeenCalledTimes(2)
    expect(MapRegionButton).toHaveBeenNthCalledWith(
      1,
      expect.objectContaining({
        type: 'subregion',
        label: 'Northern Africa',
        active: 'country',
        countries: expect.objectContaining({
          isLoading: false,
          error: undefined,
          data: [],
          endpoint: 'subregionCountriesEndpoint'
        })
      }),
      expect.anything()
    )
    expect(MapRegionButton).toHaveBeenNthCalledWith(
      2,
      expect.objectContaining({
        type: 'region',
        label: 'Africa',
        active: 'country',
        countries: expect.objectContaining({
          isLoading: false,
          error: undefined,
          data: [],
          endpoint: 'regionCountriesEndpoint'
        })
      }),
      expect.anything()
    )
  })

  test('It renders with no capitalname', () => {
    render(<MapControles 
      country={singleCountryMocks[2]} 
      map={map} 
      setCountryOnMap={setCountryOnMap}
      setGeoCodeLoading={setGeoCodeLoading}
      setGeoCodeError={setGeoCodeError}
      regionCountries={regionCountries}
      subregionCountries={subregionCountries} />
    )
    expect(MapCapitalButton).not.toHaveBeenCalled()
  })

  test('It renders with no subregion', () => {
    render(<MapControles 
      country={singleCountryMocks[1]} 
      map={map} 
      setCountryOnMap={setCountryOnMap}
      setGeoCodeLoading={setGeoCodeLoading}
      setGeoCodeError={setGeoCodeError}
      regionCountries={regionCountries}
      subregionCountries={subregionCountries} />
    )
    expect(MapCapitalButton).toHaveBeenCalledWith(
      expect.objectContaining({
        subregion: 'Africa',
      }),
      expect.anything()
    )
    expect(MapRegionButton).toHaveBeenCalledTimes(1)
  })

})