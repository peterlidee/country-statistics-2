import { screen, render } from '@testing-library/react'
import { toBeInTheDocument } from '@testing-library/jest-dom'

import weatherMock from '../../../../__mock__/data/weatherMock'
import WeatherWidget from '../WeatherWidget'
import IconWindDirection from '../../../svgSnippets/IconWindDirection'
import IconWeather from '../../../svgSnippets/IconWeather'

jest.mock('../../../svgSnippets/IconWindDirection')
jest.mock('../../../svgSnippets/IconWeather')

describe('components/single/weather/WeatherWidget', () => {
  test('It renders with data', () => {
    const { container } = render(
      <WeatherWidget 
        loading={false} 
        error={false} 
        data={weatherMock} 
        countryCode="DZA" />
    )
    expect(container.querySelector('.weather')).toBeInTheDocument()
    const descriptions = [...(container.querySelectorAll('.weather__description'))]
    expect(descriptions[0]).toHaveTextContent('weather in Algiers')
    expect(descriptions[1]).toHaveTextContent('clear sky')
    expect(container.querySelector('.day')).toBeInTheDocument()
    expect(container.querySelector('.clear')).toBeInTheDocument()
    expect(container.querySelector('.weather__temp--max')).toHaveTextContent('39')
    expect(container.querySelector('.weather__temp--min')).toHaveTextContent('36')
    expect(IconWeather).toHaveBeenCalledWith(
      expect.objectContaining({
        type: 'clear'
      }),
      expect.anything()
    )
    expect(IconWindDirection).toHaveBeenCalledWith(
      expect.objectContaining({
        deg: 360
      }),
      expect.anything()
      )
    expect(container.querySelector('.weather__wind-speed')).toHaveTextContent('15')
  })
  test('It renders with no data', () => {
    jest.clearAllMocks()
    const { container } = render(
      <WeatherWidget 
        loading={false} 
        error={false} 
        data={undefined} 
        countryCode="DZA" />
    )
    expect(container.querySelector('.weather')).toBeInTheDocument()
    const descriptions = [...(container.querySelectorAll('.weather__description'))]
    expect(descriptions[0]).toHaveTextContent('weather in DZA')
    expect(descriptions[1]).toHaveTextContent('___')
    expect(container.querySelector('.day')).toBeInTheDocument()
    expect(container.querySelector('.nodata')).toBeInTheDocument()
    expect(container.querySelector('.weather__temp--max')).toHaveTextContent('__')
    expect(container.querySelector('.weather__temp--max')).toHaveTextContent('__')
    expect(IconWeather).toHaveBeenCalledWith(
      expect.objectContaining({
        type: 'nodata'
      }),
      expect.anything()
    )
    expect(IconWindDirection).toHaveBeenCalledWith(
      expect.objectContaining({
        deg: 90
      }),
      expect.anything()
    )
    expect(container.querySelector('.weather__wind-speed')).toHaveTextContent('__')
  })
})