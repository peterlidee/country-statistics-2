import { render, screen, toHaveBeenCalled } from '@testing-library/react'
import { toBeInTheDocument } from '@testing-library/jest-dom'

import Footer from "../Footer"
import IconLogo from "../svgSnippets/IconLogo"
import Wrapper from "../general/Wrapper"

jest.mock('../svgSnippets/IconLogo')
jest.mock('../general/Wrapper', () => {
  return jest.fn((props) => <>{props.children}</>)
})

beforeEach(() => {
  jest.clearAllMocks()
})

describe('components/Footer', () => {
  test('It renders the footer', () => {
    const { container } = render(<Footer />)
    expect(container.querySelector('footer')).toBeInTheDocument()
  })
  test('It renders IconLogo mock', () => {
    render(<Footer />)
    expect(IconLogo).toHaveBeenCalled()
  })
  test('It renders wrapper mock', () => {
    render(<Footer />)
    expect(Wrapper).toHaveBeenCalledTimes(6)
  })
  test('It renders the children of the mock wrapper', () => {
    render(<Footer />)
    expect(screen.getAllByRole('heading', { level: 4 })).toHaveLength(6)
  })
})