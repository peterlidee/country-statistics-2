import { render, screen, toHaveBeenCalled } from '@testing-library/react'
import { toBeInTheDocument } from '@testing-library/jest-dom'
import Page from "../Page"
import Footer from "../Footer"

jest.mock('../Footer')

describe('components/Page', () => {
  test('It renders', () => {
    const { container } = render(<Page />)
    expect(container.querySelector('.site__container')).toBeInTheDocument()
    expect(Footer).toHaveBeenCalled()
  })
  test('It renders the footer mock', () => {
    render(<Page />)
    expect(Footer).toHaveBeenCalled()
  })
  test('It passes props.children', () => {
    render(<Page><div data-testid="Child" /></Page>)
    expect(screen.getByTestId('Child')).toBeInTheDocument()
  })
})