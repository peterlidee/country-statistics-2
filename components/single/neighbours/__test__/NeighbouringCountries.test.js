import { screen, render } from '@testing-library/react'
import { toBeInTheDocument } from '@testing-library/jest-dom'

import useFetch from 'react-fetch-hook'
import NeighbouringCountries, { findMatchingCountry } from '../NeighbouringCountries'
import Source from '../../../sources/Source'
import NeighbourComponent from '../NeighbourComponent'

test('helper function findMatchingCountry', () => {
  const countries = [
    { cca3: 'aaa' },
    { cca3: 'bbb' },
    { cca3: 'ccc' },
    { cca3: 'ddd' },
    { cca3: 'eee' },
    { cca3: 'fff' },
    { cca3: 'ggg' },
    { cca3: 'hhh' },
  ]
  const find1 = findMatchingCountry('fff', countries)
  const find2 = findMatchingCountry('ff', countries)
  const find3 = findMatchingCountry('zzz', countries)
  expect(find1[0]).toMatchObject({ cca3: 'fff' })
  expect(find2).toEqual([])
  expect(find3).toEqual([])
})

jest.mock('react-fetch-hook')
jest.mock('../../../sources/Source')
jest.mock('../NeighbourComponent', () => {
  return jest.fn((props) => <>{props.children}</>)
})

describe('components/single/sections/NeighbouringCountries', () => {
  test('It renders with no data', () => {
    useFetch.mockReturnValue({
      isLoading: false,
      error: undefined,
      data: []
    })
    const { container } = render(
      <NeighbouringCountries 
        borders={['aaa', 'bbb', 'ccc']}
      />
    )
    expect(NeighbourComponent).toHaveBeenCalled()
    expect(container.querySelector('.neighbours-grid')).not.toBeInTheDocument()
    expect(screen.getAllByRole('link')).toHaveLength(3)
    expect(screen.getByRole('link', { name: 'aaa' })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'aaa' })).toHaveAttribute('href', '/country/aaa')
    expect(screen.getByRole('link', { name: 'bbb' })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'ccc' })).toBeInTheDocument()
  })

  test('It renders with data', () => {
    // jest.resetAllMocks()
    useFetch.mockReturnValue({
      isLoading: false,
      error: undefined,
      data: [
        { cca3: 'aaa', name: { common: 'aaaa'}},
        { cca3: 'bbb', name: { common: 'bbbb'}},
      ]
    })
    render(
      <NeighbouringCountries 
        borders={['aaa', 'bbb', 'zzz']}
      />
    )
    expect(screen.getAllByRole('link')).toHaveLength(3)
    expect(screen.getByRole('link', { name: 'aaaa' })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'aaaa' })).toHaveAttribute('href', '/country/aaa')
    
    expect(screen.getByRole('link', { name: 'bbbb' })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'zzz' })).toBeInTheDocument()
  })

  test('It gets a grid class with more then 6 border items', () => {
    // jest.resetAllMocks()
    useFetch.mockReturnValue({
      isLoading: false,
      error: undefined,
      data: []
    })
    const { container } = render(
      <NeighbouringCountries 
        borders={['aaa', 'bbb', 'ccc', 'ddd', 'eee', 'fff', 'ggg', 'hhh']}
      />
    )
    expect(container.querySelector('.neighbours-grid')).toBeInTheDocument()
  })

  test('It rerenders correctly', () => {
    useFetch.mockReturnValue({
      isLoading: false,
      error: undefined,
      data: [
        { cca3: 'aaa', name: { common: 'aaaa'}},
        { cca3: 'bbb', name: { common: 'bbbb'}},
        { cca3: 'ccc', name: { common: 'cccc'}},
        { cca3: 'ddd', name: { common: 'dddd'}},
      ]
    })
    const { rerender } = render(
      <NeighbouringCountries 
        borders={['aaa', 'bbb']}
      />
    )
    expect(screen.getByRole('link', { name: 'aaaa' })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'bbbb' })).toBeInTheDocument()
    render(
      <NeighbouringCountries 
        borders={['ccc', 'ddd']}
      />
    )
    expect(screen.getByRole('link', { name: 'cccc' })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'dddd' })).toBeInTheDocument()
  })

})