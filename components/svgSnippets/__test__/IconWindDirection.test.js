import { render, screen } from '@testing-library/react'
import { toBeInTheDocument, toHaveStyle } from '@testing-library/jest-dom'
import IconWindDirection from "../IconWindDirection"

describe('svgSnippets/IconWindDirection', () => {
  test('It renders', () => {
    const { container } = render(<IconWindDirection deg={90} />)
    expect(container.querySelector('svg')).toBeInTheDocument()
  })
  test('It has the correct transform style attribute', () => {
    const { container } = render(<IconWindDirection deg={90} />)
    expect(container.querySelector('svg')).toHaveStyle('transform: rotate(360deg)')
  })
})