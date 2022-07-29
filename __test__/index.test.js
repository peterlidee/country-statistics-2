import { screen, render } from '@testing-library/react'
import { toBeInTheDocument } from '@testing-library/jest-dom'
import HomePage from "../pages"
import Home from '../components/Home'

jest.mock('../components/Home', () => {
  return jest.fn((props) => <div data-testid="Home" {...props} />)
})

describe('page/index.js', () => {
  test('It renders because Home was called', () => {
    render(<HomePage />)
    expect(screen.getByTestId('Home')).toBeInTheDocument()
  })
  test('Home mock is called with the correct props', () => {
    render(<HomePage countries={[1,2,3]} endpoint="url" />)
    expect(Home).toHaveBeenCalledWith(
      expect.objectContaining({
      endpoint: 'url',
      countries: [1,2,3],
    }), expect.anything())
  })
})