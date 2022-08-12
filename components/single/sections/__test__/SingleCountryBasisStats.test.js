import { screen, render } from '@testing-library/react'
import { toBeInTheDocument } from '@testing-library/jest-dom'
import BoxWrapper from '../../../general/BoxWrapper'

jest.mock('../../../general/BoxWrapper', () => {
  return jest.fn((props) => <div data-testid="BowWrapper">{props.children}</div>)
})

import SingleCountryBasisStats from '../SingleCountryBasicStats'

describe('components/single/sections/SingleCountryBasicStats', () => {
  
  test('It renders', () => {
    const { container } = render(
      <SingleCountryBasisStats 
        population={10000000}
        area={1000000}
      />
    )
    expect(BoxWrapper).toHaveBeenCalledWith(
      expect.objectContaining({ name: 'basic-stats' }),
      expect.anything()
    )
    expect(screen.getByText(/Total population/i)).toBeInTheDocument()
    expect(screen.getByText(/10.000.000/i)).toBeInTheDocument()
    expect(screen.getByText(/Size/i)).toBeInTheDocument()
    expect(screen.getByText(/1.000.000/i)).toBeInTheDocument()
    expect(screen.getByText(/Population density/i)).toBeInTheDocument()
    expect(screen.getByText(/10 inhabitants \/ km²/i)).toBeInTheDocument()
  })
})