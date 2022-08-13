import { screen, render } from '@testing-library/react'
import { toBeInTheDocument } from '@testing-library/jest-dom'

import SingleCountryStatus from '../SingleCountryStatus'

const ChildMock = jest.fn()

describe('components/single/sections/SingleCountryStatus', () => {
  test('It renders with error', () => {
    const { container } = render(
      <SingleCountryStatus 
        loading={false} 
        error={new Error('An error')} 
        data={{}} 
        countryCode={'aaa'}>
        <ChildMock />
      </SingleCountryStatus>
    )
    expect(container.querySelector('.single-country__status')).toBeInTheDocument()
    expect(container.querySelector('.error-message')).toBeInTheDocument()
    expect(screen.getByText('No data found for aaa')).toBeInTheDocument()
    expect(ChildMock).toHaveBeenCalled()
  })

  test('It renders with no data and no error', () => {
    const { container } = render(
      <SingleCountryStatus 
        loading={false} 
        error={undefined} 
        data={undefined} 
        countryCode={'aaa'}>
        <ChildMock />
      </SingleCountryStatus>
    )
    expect(container.querySelector('.single-country__status')).toBeInTheDocument()
    expect(container.querySelector('.error-message')).toBeInTheDocument()
    expect(screen.getByText('No data found for aaa')).toBeInTheDocument()
    expect(ChildMock).toHaveBeenCalled()
  })

  test('It renders with data and no error', () => {
    const { container } = render(
      <SingleCountryStatus 
        loading={false} 
        error={undefined} 
        data="data" 
        countryCode={'aaa'}>
        <ChildMock />
      </SingleCountryStatus>
    )
    expect(container.querySelector('.single-country__status')).toBeInTheDocument()
    expect(container.querySelector('.error-message')).not.toBeInTheDocument()
    expect(ChildMock).toHaveBeenCalled()
  })
})