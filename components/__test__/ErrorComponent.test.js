import { render, screen, toHaveBeenCalled, waitFor } from '@testing-library/react'
import { toBeInTheDocument } from '@testing-library/jest-dom'

import ErrorComponent from "../ErrorComponent"
import Header from '../header/Header'

jest.mock('../header/Header')

jest.mock('next/head', () => {
  return {
    __esModule: true,
    default: ({ children }) => {
      return <>{children}</>
    },
  }
})

describe('components/ErrorComponent', () => {
  test('It renders', () => {
    const { container } = render(<ErrorComponent />)
    expect(container.querySelectorAll('div')).toHaveLength(3)
  })
  test("It should render the correct title tag via head mock", () => {
    render(<ErrorComponent />, { container: document.head })
    expect(document.title).toBe("404 Page not found")
  })
  test('It gets the correct styles', () => {
    const { container } = render(<ErrorComponent />)
    expect(container.querySelectorAll('div')[0]).toHaveStyle('maxWidth: 1500px')
  })
  test('It calls the header mock', () => {
    render(<ErrorComponent />)
    expect(Header).toHaveBeenCalled()
  })
})