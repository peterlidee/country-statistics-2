import { render, screen } from '@testing-library/react'
import { toBeInTheDocument } from '@testing-library/jest-dom'
import CustomErrorPage from '../pages/404.js'

jest.mock('../components/ErrorComponent', () => {
  return jest.fn(() => <div data-testid="ErrorComponent" />)
})

describe('pages/404.js', () => {
  test('It renders because the mock is in the document', () => {
    render(<CustomErrorPage />)
    expect(screen.getByTestId('ErrorComponent')).toBeInTheDocument()
  })
})