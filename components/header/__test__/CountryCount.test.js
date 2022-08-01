import { render, screen, toHaveBeenCalled } from '@testing-library/react'
import { toBeInTheDocument } from '@testing-library/jest-dom'

import CountryCount from '../CountryCount'

describe('components/header/CountryCount', () => {
  test('It renders', () => {
    const { container } = render(<CountryCount count={100} />)
    expect(container.querySelector('.country-count')).toBeInTheDocument()
  })
  test('It displays the correct count', () => {
    const { container, rerender } = render(<CountryCount count={100} />)
    const number = container.querySelector('.country-count__number')
    expect(number).toHaveTextContent('100')
    expect(screen.queryByText(/countries/i)).toBeInTheDocument()
    rerender(<CountryCount count={10} />)
    expect(number).toHaveTextContent('10')
    expect(screen.queryByText(/countries/i)).toBeInTheDocument()
    rerender(<CountryCount count={1} />)
    expect(number).toHaveTextContent('1')
    expect(screen.queryByText(/country/i)).toBeInTheDocument()
  })
})