import { screen, render } from '@testing-library/react'
import { toBeInTheDocument } from '@testing-library/jest-dom'

import MapCapitalButton from '../MapCapitalButton'
import IconPan from '../../../svgSnippets/IconPan'

jest.mock('../../../svgSnippets/IconPan')

describe('components/single/map/MapControles', () => {
  test('It renders', () => {
    const { container } = render(
      <MapCapitalButton 
        capital="Algiers"
        countryName="Algeria"
        subregion="Northern Africa"
        map={{}} 
        active="country" 
        setActive={() => {}} 
        setGeoCodeLoading={() => {}}
        setGeoCodeError={() => {}} />
    )
    expect(container.querySelector('.map-controles__button-container')).toBeInTheDocument()
    expect(IconPan).toHaveBeenCalledWith(
      expect.objectContaining({
        active: false
      }),
      expect.anything()
    )
    expect(screen.getByRole('button', { name: 'Algiers' })).toBeInTheDocument()
  })
})