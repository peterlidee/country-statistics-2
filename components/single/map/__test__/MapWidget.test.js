import { screen, render } from '@testing-library/react'

import singleCountriesMock from '../../../../__mock__/data/singleCountryMocks'
import MapControles from '../MapControles'
import Sources from '../../../sources/Sources'
import Source from '../../../sources/Source'
import Placeholder from '../../../svgSnippets/Placeholder'
import MapWidget from '../MapWidget'
import { GoogleMap, useJsApiLoader } from '@react-google-maps/api'

jest.mock('../MapControles')
jest.mock('../../../sources/Sources', () => {
  return jest.fn((props) => <>{props.children}</>)
})
jest.mock('../../../sources/Source')
jest.mock('../../../svgSnippets/Placeholder')
jest.mock('@react-google-maps/api', () => {
  return({
    __esModule: true,
    GoogleMap: jest.fn(),
    useJsApiLoader: jest.fn(() => ({
      isLoaded: false,
      loadError: undefined,
    }))
  })
})

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

describe('components/single/map/MapWidget', () => {

  test('It renders', () => {
    const { container } = render(
      <MapWidget 
        country={singleCountriesMock[0]}
        regionCountries={regionCountries}
        subregionCountries={subregionCountries}
      />
    )
    expect(GoogleMap).not.toHaveBeenCalled()
    expect(useJsApiLoader).toHaveBeenCalled()
    expect(MapControles).not.toHaveBeenCalled()
    expect(Placeholder).toHaveBeenCalled()
    expect(Sources).toHaveBeenCalled()
    expect(Source).toHaveBeenNthCalledWith(
      1,
      expect.objectContaining({
        label: 'Google Maps API'
      }),
      expect.anything()
    )
    expect(Source).toHaveBeenNthCalledWith(
      2,
      expect.objectContaining({
        label: 'Google GeoCode API'
      }),
      expect.anything()
    )
    expect(Source).toHaveBeenNthCalledWith(
      3,
      expect.objectContaining({
        endpoint: 'regionCountriesEndpoint'
      }),
      expect.anything()
    )
    expect(Source).toHaveBeenNthCalledWith(
      4,
      expect.objectContaining({
        endpoint: 'subregionCountriesEndpoint'
      }),
      expect.anything()
    )
  })
})