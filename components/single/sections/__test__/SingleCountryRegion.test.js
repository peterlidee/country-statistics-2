import { screen, render } from '@testing-library/react'

import singleCountryMocks from '../../../../__mock__/data/singleCountryMocks'
import SingleCountryRegion from '../SingleCountryRegion'
import RenderLabelValue from '../../region/RenderLabelValue'
import ValidateNeighbouringCountries from '../../neighbours/ValidateNeighbouringCountries'

jest.mock('../../region/RenderLabelValue')
jest.mock('../../neighbours/ValidateNeighbouringCountries')

describe('components/single/sections/SingleCountryRegion', () => {
  
  test('It renders with data', () => {
    render(
      <SingleCountryRegion 
        loading={false}
        error={undefined}
        data={singleCountryMocks[0]}
      />
    )
    expect(RenderLabelValue.mock.calls).toHaveLength(3)
    expect(RenderLabelValue.mock.calls[0][0]).toMatchObject({
      loading: false,
      hasData: true,
      value: 'Africa',
      // label: 'region',
    })
    expect(RenderLabelValue.mock.calls[1][0]).toMatchObject({
      loading: false,
      hasData: true,
      value: 'Northern Africa',
      label: 'subregion',
    })
    expect(RenderLabelValue.mock.calls[2][0]).toMatchObject({
      loading: false,
      hasData: true,
      value: 'Algiers',
      label: 'capital',
    })
    expect(ValidateNeighbouringCountries).toHaveBeenCalledWith(
      expect.objectContaining({
        loading: false,
        error: undefined,
      }),
      expect.anything()
    )
  })

  test('It renders with data but no region, subregion or capital', () => {
    render(
      <SingleCountryRegion 
        loading={false}
        error={undefined}
        data={{}}
      />
    )
    expect(RenderLabelValue.mock.calls[0][0]).toMatchObject({ value: undefined })
    expect(RenderLabelValue.mock.calls[1][0]).toMatchObject({ value: undefined })
    expect(RenderLabelValue.mock.calls[2][0]).toMatchObject({ value: null })
  })

  test('It renders with no data', () => {
    jest.resetAllMocks()
    render(
      <SingleCountryRegion 
        loading={true}
        error={undefined}
        data={undefined}
      />
    )
    expect(RenderLabelValue.mock.calls[0][0]).toMatchObject({ value: undefined })
    expect(RenderLabelValue.mock.calls[1][0]).toMatchObject({ value: undefined })
    expect(RenderLabelValue.mock.calls[2][0]).toMatchObject({ value: null })
  })

  test('It rerenders correctly', () => {
    const { rerender } = render(
      <SingleCountryRegion 
        loading={false}
        error={undefined}
        data={singleCountryMocks[0]}
      />
    )
    expect(RenderLabelValue.mock.calls[0][0]).toMatchObject({ value: 'Africa' })
    expect(RenderLabelValue.mock.calls[1][0]).toMatchObject({ value: 'Northern Africa' })
    expect(RenderLabelValue.mock.calls[2][0]).toMatchObject({ value: 'Algiers' })
    
    rerender(
      <SingleCountryRegion 
        loading={false}
        error={undefined}
        data={singleCountryMocks[3]}
      />
    )
    expect(RenderLabelValue.mock.calls[3][0]).toMatchObject({ value: 'Europe' })
    expect(RenderLabelValue.mock.calls[4][0]).toMatchObject({ value: 'Western Europe' })
    expect(RenderLabelValue.mock.calls[5][0]).toMatchObject({ value: 'Brussels' })
  })

})