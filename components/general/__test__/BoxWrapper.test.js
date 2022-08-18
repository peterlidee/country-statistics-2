import { screen, render } from '@testing-library/react'
import { toBeInTheDocument } from '@testing-library/jest-dom'

import BoxWrapper from '../BoxWrapper'

const ChildMock = jest.fn()

describe('components/general/BoxWrapper', () => {
  test('It renders', () => {
    const { container } = render(<BoxWrapper name="test" />)
    expect(container.querySelector('.single-country__test')).toBeInTheDocument()
  })
  test('It prints the correct class', () => {
    const { container, rerender } = render(<BoxWrapper name="test" />)
    expect(container.querySelector('.single-country__test')).toBeInTheDocument()
    rerender(<BoxWrapper name="test2" />)
    expect(container.querySelector('.single-country__test2')).toBeInTheDocument()
  })
  test('It passes children correctly', () => {
    render(<BoxWrapper name="test"><ChildMock /></BoxWrapper>)
    expect(ChildMock).toHaveBeenCalled()
  })
})