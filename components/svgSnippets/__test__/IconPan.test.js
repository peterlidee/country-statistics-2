import { screen, render } from '@testing-library/react'
import { toBeInTheDocument } from '@testing-library/jest-dom'
import IconPan from '../IconPan'

describe.only('svgSnippets/IconPan.js renders', () => {
  test('It renders', () => {
    const { container } = render(<IconPan active />)
    expect(container.querySelector('svg')).toBeInTheDocument()
  })
  test('It has the correct active class', () => {
    const { container } = render(<IconPan active />)
    expect(container.querySelector('svg')).toHaveClass('icon__pan--active')
  })
  test('It has the correct not active class', () => {
    const { container } = render(<IconPan active={false} />)
    expect(container.querySelector('svg')).not.toHaveClass('icon__pan--active')
  })
})