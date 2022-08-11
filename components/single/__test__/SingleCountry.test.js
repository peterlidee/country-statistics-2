import { screen, render } from '@testing-library/react'
import { toBeInTheDocument } from '@testing-library/jest-dom'

import SingleCountry from '../SingleCountry'

import Header from '../../header/Header'
import Sources from '../../sources/Sources'
import Source from '../../sources/Source'
import BreadCrumb from '../BreadCrumb'

import SingleCountryHeader from '../sections/SingleCountryHeader'
import SingleCountryStatus from '../sections/SingleCountryStatus'
import SingleCountryFlags from '../sections/SingleCountryFlags'
import SingleCountryBasisStats from '../sections/SingleCountryBasicStats'
import SingleCountryWeather from '../sections/SingleCountryWeather'
import SingleCountryMap from '../sections/SingleCountryMap'
import SingleCountryRegion from '../sections/SingleCountryRegion'
import SingleCountryPopulationChart from '../sections/SingleCountryPopulationChart'

import singleCountryMocks from '../../../__mock__/data/singleCountryMocks'

jest.mock('../../header/Header')
jest.mock('../../sources/Sources', () => {
  return jest.fn((props) => <div data-testid='Sources'>{props.children}</div>)
})
jest.mock('../../sources/Source')
jest.mock('../BreadCrumb')
jest.mock('../sections/SingleCountryHeader', () => {
  return jest.fn((props) => <div data-testid='SingleCountryHeader'>{props.children}</div>)
})
jest.mock('../sections/SingleCountryStatus', () => {
  return jest.fn((props) => <div data-testid='SingleCountryStatus'>{props.children}</div>)
})
jest.mock('../sections/SingleCountryFlags')
jest.mock('../sections/SingleCountryBasicStats')
jest.mock('../sections/SingleCountryWeather')
jest.mock('../sections/SingleCountryMap')
jest.mock('../sections/SingleCountryRegion')
jest.mock('../sections/SingleCountryPopulationChart')

describe('components/single/SingleCountry', () => {
  test('It renders', () => {
    console.log('country',singleCountryMocks[0].name.common)
    const { container } = render(
      <SingleCountry 
        countryCode={'DZA'}
        singleEndpoint={'singleEndpoint'}
        country={singleCountryMocks[0]} />
    )
    expect(Header).toHaveBeenCalled()
    expect(BreadCrumb).toHaveBeenCalledWith(
      expect.objectContaining(
        { countryName: 'Algeria' }
      ),
      expect.anything()
    )
    expect(container.querySelector('.single-country')).toBeInTheDocument()
    expect(SingleCountryHeader).toHaveBeenCalledWith(
      expect.objectContaining(
        { countryName: 'Algeria' }
      ),
      expect.anything()
    )
    expect(screen.getByTestId('SingleCountryHeader')).toBeInTheDocument()
    expect(SingleCountryStatus).toHaveBeenCalledWith(
      expect.objectContaining({
        loading: false, 
        error: false, 
        countryCode: 'DZA'
      }),
      expect.anything()
    )
    expect(screen.getByTestId('SingleCountryStatus')).toBeInTheDocument()
    expect(Sources).toHaveBeenCalled()
    expect(screen.getByTestId('Sources')).toBeInTheDocument()
    expect(Source).toHaveBeenCalledWith(
      expect.objectContaining({
        label: 'restcountries.com/{code}',
        endpoint: 'singleEndpoint',
        error: false,
        loading: false,
      }),
      expect.anything()
    )
    expect(SingleCountryFlags).toHaveBeenCalledWith(
      expect.objectContaining({
        countryName: 'Algeria',
        flag: expect.stringContaining('.svg'),
        coatOfArms: expect.stringContaining('.svg')
      }),
      expect.anything()
    )
    expect(SingleCountryBasisStats).toHaveBeenCalledWith(
      expect.objectContaining({
        population: 44700000,
        area: 2381741,
      }),
      expect.anything()
    )
    expect(SingleCountryWeather).toHaveBeenCalledWith(
      expect.objectContaining({
        loading: false,
        error: false,
        cca2: 'DZ',
        capitalName: 'Algiers',
        countryCode: 'DZA',
      }),
      expect.anything()
    )
    expect(SingleCountryMap).toHaveBeenCalled()
    expect(SingleCountryRegion).toHaveBeenCalledWith(
      expect.objectContaining({
        error: false, 
        loading: false
      }),
      expect.anything()
    )
    expect(SingleCountryPopulationChart).toHaveBeenCalledWith(
      expect.objectContaining({ countryCode: 'DZA' }),
      expect.anything()
    )
  })
})