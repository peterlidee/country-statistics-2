import { screen, render } from '@testing-library/react'
import { toBeInTheDocument } from '@testing-library/jest-dom'

import Sources from '../Sources'

describe('components/sources/Sources', () => {
  test('It renders', () => {
    const { container } = render(<Sources><div data-testid="kids" /></Sources>)
    expect(container.querySelector('div')).toBeInTheDocument()
  })
  test('It renders the kids', () => {
    const { container } = render(<Sources><div data-testid="kids" /></Sources>)
    expect(screen.getByTestId('kids')).toBeInTheDocument()
  })
})