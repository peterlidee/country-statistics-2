import { screen, render } from '@testing-library/react'
import { toBeInTheDocument } from '@testing-library/jest-dom'
import IconSettings from '../IconSettings'

test('svgSnippets/IconSettings.js renders', () => {
  const { container } = render(<IconSettings />)
  expect(container.querySelector('svg')).toBeInTheDocument()
})