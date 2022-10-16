import { screen, render } from '@testing-library/react'

import MapRegionButton from '../MapRegionButton'
import IconPan from '../../../svgSnippets/IconPan'

jest.mock('../../../svgSnippets/IconPan')

const subregionCountries = {
  isLoading: false,
  error: undefined,
  data: [],
  endpoint: 'subregionCountriesEndpoint'
}

const subregionCountriesLoading = {
  isLoading: true,
  error: undefined,
  data: [],
  endpoint: 'subregionCountriesEndpoint'
}

const subregionCountriesNoData = {
  isLoading: false,
  error: undefined,
  data: undefined,
  endpoint: 'subregionCountriesEndpoint'
}

describe('components/single/map/MapControles', () => {

  test('It renders with no label', () => {
    render(
      <MapRegionButton 
        type="subregion" 
        label=""
        map={{}} 
        active="country"
        setActive={() => {}} 
        countries={subregionCountries} />
    )
    expect(IconPan).not.toHaveBeenCalled()
    expect(screen.queryByRole('button')).not.toBeInTheDocument()
  })

  test('It renders', () => {
    render(
      <MapRegionButton 
        type="subregion" 
        label="Northern Africa"
        map={{}} 
        active="country"
        setActive={() => {}} 
        countries={subregionCountries} />
    )
    expect(IconPan).toHaveBeenCalledWith(
      expect.objectContaining({ active: false }),
      expect.anything()
    )
    expect(screen.getByRole('button', { name: 'Northern Africa' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Northern Africa' })).toBeEnabled()
  })

  test('It renders with loading', () => {
    render(
      <MapRegionButton 
        type="subregion" 
        label="Northern Africa"
        map={{}} 
        active="country"
        setActive={() => {}} 
        countries={subregionCountriesLoading} />
    )
    expect(screen.getByRole('button', { name: 'Northern Africa' })).toBeDisabled()
  })

  test('It renders with no data', () => {
    const { container } = render(
      <MapRegionButton 
        type="subregion" 
        label="Northern Africa"
        map={{}} 
        active="country"
        setActive={() => {}} 
        countries={subregionCountriesNoData} />
    )
    expect(IconPan).not.toHaveBeenCalled()
    expect(screen.queryByRole('button')).not.toBeInTheDocument()
  })
  
})