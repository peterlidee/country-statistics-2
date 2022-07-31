import { screen, render } from '@testing-library/react'
import { toBeInTheDocument } from '@testing-library/jest-dom'

import Wrapper from '../Wrapper'

describe('components/general/Wrapper', () => {
  test('It renders', () => {
    const { container } = render(<Wrapper base="base" modifier="modifier" />)
    expect(container.querySelector('div')).toBeInTheDocument()
  })
  test('It prints the correct classes', () => {
    const { container, rerender } = render(<Wrapper base="base" modifier="modifier" />)
    expect(container.querySelector('div')).toHaveClass('base base--modifier')
    rerender(<Wrapper base="base2" modifier="modifier2" />)
    expect(container.querySelector('div')).toHaveClass('base2 base2--modifier2')
  })
  test('It passes children correctly', () => {
    const { container } = render(<Wrapper base="base" modifier="modifier"><div data-testid="Child" /></Wrapper>)
    expect(screen.getByTestId('Child')).toBeInTheDocument()
  })
})