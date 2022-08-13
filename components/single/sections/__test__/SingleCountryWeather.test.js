import { screen, render } from '@testing-library/react'
import { toBeInTheDocument } from '@testing-library/jest-dom'

import SingleCountryWeather from '../SingleCountryWeather'
import Placeholder from '../../../svgSnippets/Placeholder'
import BoxWrapper from '../../../general/BoxWrapper'
import SingleCountryFetch from '../../SingleCountryFetch'
import WeatherWidget from '../../weather/WeatherWidget'

jest.mock('../../../svgSnippets/Placeholder')
jest.mock('../../../general/BoxWrapper', () => {
  return jest.fn(props => <div data-testid='BoxWrapper'>{props.children}</div>)
})
jest.mock('../../SingleCountryFetch', () => {
  return jest.fn(props => (
    <div data-testid="SingleCountryFetch">
      {props.children(false, undefined, [1,2,3])}
    </div>
  ))
})
jest.mock('../../weather/WeatherWidget')

describe('components/single/sections/SingleCountryWeather', () => {
  test('It renders with loading and no capitalName', () => {
    render(
      <SingleCountryWeather 
        loading={false}
        error={new Error('Error')}
        cca2={undefined} 
        capitalName={null}
        countryCode={'DZA'} />
    )
    expect(BoxWrapper).toHaveBeenCalledWith(
      expect.objectContaining({ 
        name: 'placeholder',
        children: expect.anything()
      }),
      expect.anything()
    )
    expect(Placeholder).toHaveBeenCalled()
  })

  test('It renders with error', () => {
    render(
      <SingleCountryWeather 
        loading={true}
        error={undefined}
        cca2={undefined} 
        capitalName={null}
        countryCode={'DZA'} />
    )
    expect(BoxWrapper).toHaveBeenCalledWith(
      expect.objectContaining({ 
        name: 'placeholder',
        children: expect.anything()
      }),
      expect.anything()
    )
    expect(Placeholder).toHaveBeenCalled()
  })

  test('It renders with !loading, !error and !capitalName', () => {
    const { container } = render(
      <SingleCountryWeather 
        loading={false}
        error={false}
        cca2={"DZ"} 
        capitalName={undefined}
        countryCode={'DZA'} />
    )
    expect(container.querySelector('.single-country__weather')).toBeInTheDocument()
  })

  test('It renders with !loading, !error and capitalName', () => {
    render(
      <SingleCountryWeather 
        loading={false}
        error={false}
        cca2={"DZ"} 
        capitalName="Algiers"
        countryCode={'DZA'} />
    )
    expect(SingleCountryFetch).toHaveBeenCalled()
    expect(WeatherWidget).toHaveBeenCalledWith(
      expect.objectContaining({
        countryCode: 'DZA',
        loading: false,
        error: undefined,
        data: [1,2,3],
      }),
      expect.anything()
    )
  })

})