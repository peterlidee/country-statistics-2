import { screen, render } from '@testing-library/react'

import SingleCountryPopulationChart from '../SingleCountryPopulationChart'
import SingleCountryFetch from '../../SingleCountryFetch'
import PopulationChartWidget from '../../chart/PopulationChartWidget'

import populationDataMock from '../../../../__mock__/data/populationDataMock'
import chartDataMock from '../../../../__mock__/data/chartDataMock'

jest.mock('../../chart/PopulationChartWidget')
jest.mock('../../SingleCountryFetch', () => jest.fn())

describe('components/single/sections/SingleCountryPopulationChart', () => {

  test('It renders with no data (undefined)', () => {
    // simulate no data on SingleCountryFetch
    SingleCountryFetch.mockImplementation((props) => (
      <>{props.children(false, undefined, undefined)}</>
    ))
    render(
      <SingleCountryPopulationChart 
        countryCode="DZA" />
    )
    expect(SingleCountryFetch).toHaveBeenCalled()
    expect(PopulationChartWidget).toHaveBeenCalledWith(
      expect.objectContaining({
        years: [],
        femaleTotal: [],
        maleTotal: [],
        combinedTotal: [],
      }),
      expect.anything()
    )
  })

  test('It renders with mocked data', () => {
    // simulate no data on SingleCountryFetch
    SingleCountryFetch.mockImplementation((props) => (
      <>{props.children(false, undefined, populationDataMock)}</>
    ))
    render(
      <SingleCountryPopulationChart 
        countryCode="DZA" />
    )
    expect(SingleCountryFetch).toHaveBeenCalled()
    expect(PopulationChartWidget).toHaveBeenCalledWith(
      expect.objectContaining({
        years: chartDataMock.years,
        femaleTotal: chartDataMock.femaleTotal,
        maleTotal: chartDataMock.maleTotal,
        combinedTotal: chartDataMock.combinedTotal,
      }),
      expect.anything()
    )
  })
})