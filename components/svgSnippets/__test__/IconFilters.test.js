import { screen, render } from '@testing-library/react'
import { toBeInTheDocument } from '@testing-library/jest-dom'
import IconFilters from '../IconFilters'

test('svgSnippets/IconFilters.js renders', () => {
  const { container } = render(<IconFilters />)
  expect(container.querySelector('svg')).toBeInTheDocument()
})