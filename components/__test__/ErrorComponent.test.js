import { render, screen, toHaveBeenCalled, waitFor } from '@testing-library/react'
import { toBeInTheDocument } from '@testing-library/jest-dom'

import ErrorComponent from "../ErrorComponent"
import Header from '../header/Header'

jest.mock('../header/Header')

describe('components/ErrorComponent', () => {
  test('It renders', () => {
    const { container } = render(<ErrorComponent />)
    expect(container.querySelectorAll('div')).toHaveLength(3)
  })
  // not sure how to do this ...
  // test('It has the correct title', () => {
    
  // })
  test('It gets the correct styles', () => {
    const { container } = render(<ErrorComponent />)
    expect(container.querySelectorAll('div')[0]).toHaveStyle('maxWidth: 1500px')
  })
  test('It calls the header mock', () => {
    render(<ErrorComponent />)
    expect(Header).toHaveBeenCalled()
  })
})