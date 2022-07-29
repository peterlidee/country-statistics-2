import { screen, render } from '@testing-library/react'
import { toBeInTheDocument } from '@testing-library/jest-dom'
import Placeholder from '../Placeholder'

test('svgSnippets/Placeholder.js renders', () => {
  const { container } = render(<Placeholder />)
  expect(container.querySelector('svg')).toBeInTheDocument()
})