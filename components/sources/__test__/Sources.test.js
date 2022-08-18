import { screen, render } from '@testing-library/react'
import { toBeInTheDocument } from '@testing-library/jest-dom'

import Sources from '../Sources'
const ChildMock = jest.fn()

describe('components/sources/Sources', () => {
  test('It renders', () => {
    const { container } = render(<Sources><ChildMock /></Sources>)
    expect(container.querySelector('div')).toBeInTheDocument()
  })
  test('It renders the kids', () => {
    render(<Sources><ChildMock /></Sources>)
    expect(ChildMock).toHaveBeenCalled()
  })
})