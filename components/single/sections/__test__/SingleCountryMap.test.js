import { screen, render } from '@testing-library/react'

import singleCountryMocks from '../../../../__mock__/data/singleCountryMocks'
import SingleCountryMap from '../SingleCountryMap'
import BoxWrapper from '../../../general/BoxWrapper'
import FetchRegionCountries from '../../map/FetchRegionCountries'
import MapWidget from '../../map/MapWidget'
import Placeholder from '../../../svgSnippets/Placeholder'

jest.mock('../../../general/BoxWrapper', () => {
  return jest.fn(props => <div data-testid="BoxWrapper">{props.children}</div>)
})
jest.mock('../../../svgSnippets/Placeholder')
jest.mock('../../map/FetchRegionCountries', () => {
  return jest.fn(props => (
    <div data-testid="FetchRegionCountries">
      {props.children({ 
        loading: false, 
        error: undefined, 
        data: 'data', 
        endpoint: 'endpoint'
      })}
    </div>
  ))
})
jest.mock('../../map/MapWidget')

describe('components/single/sections/SingleCountryMap', () => {
  
  test('It renders with no country', () => {
    render(
      <SingleCountryMap 
          country={undefined} />
    )
    expect(BoxWrapper).toHaveBeenCalledWith(
      expect.objectContaining({ name: 'map' }),
      expect.anything()
    )
    expect(Placeholder).toHaveBeenCalled()
  })

  test('It renders with country but no subregion', () => {
    render(
      <SingleCountryMap 
        country={singleCountryMocks[1]} />
    )
    expect(FetchRegionCountries).toHaveBeenCalledWith(
      expect.objectContaining({
        type: 'region',
        label: 'Africa'
      }),
      expect.anything()
    )
    // MapWidget is wrapped with react.memo
    // the actual widget is available on type
    expect(MapWidget.type).toHaveBeenCalledWith(
      expect.objectContaining({
        regionCountries: expect.objectContaining({
          data: 'data',
          endpoint: 'endpoint',
          error: undefined,
          loading: false,
        })
      }),
      expect.anything()
    )
  })

  test('It renders with country and subregion', () => {
    jest.clearAllMocks()
    render(
      <SingleCountryMap 
        country={singleCountryMocks[0]} />
    )    
    expect(FetchRegionCountries).toHaveBeenCalledTimes(2)
    expect(FetchRegionCountries).toHaveBeenNthCalledWith(
      1, 
      expect.objectContaining({
        type: 'region',
        label: 'Africa'
      }),
      expect.anything()
    )
    expect(FetchRegionCountries).toHaveBeenNthCalledWith(
      2, 
      expect.objectContaining({
        type: 'subregion',
        label: 'Northern Africa'
      }),
      expect.anything()
    )
    // MapWidget is wrapped with react.memo
    // the actual widget is available on type
    expect(MapWidget.type).toHaveBeenCalledWith(
      expect.objectContaining({
        country: expect.objectContaining({
          cca3: 'DZA',
        }),
        regionCountries: expect.objectContaining({
          loading: false,
          error: undefined,
          data: 'data',
          endpoint: 'endpoint',
        }),
        subregionCountries: expect.objectContaining({
          loading: false,
          error: undefined,
          data: 'data',
          endpoint: 'endpoint',
        }),
      }),
      expect.anything()
    )
  })
})