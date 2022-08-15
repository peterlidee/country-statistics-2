import { screen, render } from '@testing-library/react'
import { toBeInTheDocument } from '@testing-library/jest-dom'

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
    const { container } = render(
      <MapRegionButton 
        type="subregion" 
        label=""
        map={{}} 
        active="country"
        setActive={() => {}} 
        countries={subregionCountries} />
    )
    expect(container.querySelector('.map-controles__button-container')).not.toBeInTheDocument()
  })

  test('It renders', () => {
    const { container } = render(
      <MapRegionButton 
        type="subregion" 
        label="Northern Africa"
        map={{}} 
        active="country"
        setActive={() => {}} 
        countries={subregionCountries} />
    )
    expect(container.querySelector('.map-controles__button-container')).toBeInTheDocument()
    expect(IconPan).toHaveBeenCalledWith(
      expect.objectContaining({ active: false }),
      expect.anything()
    )
    expect(screen.getByRole('button', { name: 'Northern Africa' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Northern Africa' })).not.toHaveAttribute('disabled')
  })

  test('It renders with loading', () => {
    const { container } = render(
      <MapRegionButton 
        type="subregion" 
        label="Northern Africa"
        map={{}} 
        active="country"
        setActive={() => {}} 
        countries={subregionCountriesLoading} />
    )
    expect(screen.getByRole('button', { name: 'Northern Africa' })).toHaveAttribute('disabled')
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
    expect(container.querySelector('.map-controles__button-container')).not.toBeInTheDocument()
  })
})