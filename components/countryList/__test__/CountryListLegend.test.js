import { screen, render } from '@testing-library/react'
import { toBeInTheDocument } from '@testing-library/jest-dom'

import CountryListLegend from '../CountryListLegend'
import Wrapper from '../../general/Wrapper'

jest.mock('../../general/Wrapper', () => {
  return jest.fn((props) => <>{props.children}</>)
})

describe('components/countrylist/CountryListLegend.js', () => {
  test('It does not render when no field.display data', () => {
    render(<CountryListLegend field={{
      display: false,
      field: 'field',
      legend: 'legend',
    }} />)
    expect(Wrapper).not.toHaveBeenCalled()
    expect(screen.queryByText('legend')).not.toBeInTheDocument()
  })
  test('It renders', () => {
    render(<CountryListLegend field={{
      display: true,
      field: 'field',
      legend: 'legend',
    }} />)
    expect(Wrapper).toHaveBeenCalled()
    expect(screen.getByText('legend')).toBeInTheDocument()
  })
})