import { render, screen, toHaveBeenCalled } from '@testing-library/react'
import { toBeInTheDocument } from '@testing-library/jest-dom'
import Page from "../Page"
import Footer from "../Footer"

jest.mock('../Footer', () => {
  return jest.fn(() => <div data-testid="Footer" />)
})

describe('components/Page', () => {
  test('It renders', () => {
    const { container } = render(<Page />)
    expect(container.querySelector('.site__container')).toBeInTheDocument()
    expect(Footer).toHaveBeenCalled()
  })
  test('It passes props.children', () => {
    const { container } = render(<Page><div data-testid="Child" /></Page>)
    expect(screen.getByTestId('Child')).toBeInTheDocument()
  })
})