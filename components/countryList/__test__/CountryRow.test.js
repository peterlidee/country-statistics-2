import { screen, render } from '@testing-library/react'
import { toBeInTheDocument, toContainElement } from '@testing-library/jest-dom'

import { extraDataCountries } from '../../../__mock__/data/countriesMock'
import CountryRow from '../CountryRow'
import Wrapper from '../../general/Wrapper'

jest.mock('../../general/Wrapper', () => {
  return jest.fn((props) => <div className='Wrapper'>{props.children}</div>)
})

describe('components/countryList/CountryRow', () => {

  test('It renders', () => {
    const { container } = render(
      <CountryRow 
        country={extraDataCountries[0]} 
        index={0} 
        hiddenFields={[]} />
    )
    expect(Wrapper).toHaveBeenCalledTimes(5)
    const wrappers = [...container.querySelectorAll('.Wrapper')]
    expect(wrappers[0]).toHaveTextContent('1')
    expect(wrappers[1]).toHaveTextContent('Austria')
    expect(screen.getByRole('link')).toHaveTextContent('Austria')
    expect(wrappers[2]).toHaveTextContent('8.917.205')
    expect(wrappers[3]).toHaveTextContent('83.871')
    expect(wrappers[4]).toHaveTextContent('106')
  })

  test('It correctly hides fields population and area', () => {
    Wrapper.mockClear()
    render(
      <CountryRow 
        country={extraDataCountries[0]} 
        index={0} 
        hiddenFields={['population', 'area']} />
    )
    expect(Wrapper).toHaveBeenCalledTimes(3)
    expect(screen.queryByText(/population/i)).not.toBeInTheDocument()
    expect(screen.queryByText(/area/i)).not.toBeInTheDocument()
  })

  test('It correctly hides field density', () => {
    Wrapper.mockClear()
    render(
      <CountryRow 
        country={extraDataCountries[0]} 
        index={0} 
        hiddenFields={['density']} />
    )
    expect(Wrapper).toHaveBeenCalledTimes(4)
    expect(screen.queryByText(/density/i)).not.toBeInTheDocument()
  })

  test('It correctly hides all fields', () => {
    Wrapper.mockClear()
    render(
      <CountryRow 
        country={extraDataCountries[0]} 
        index={0} 
        hiddenFields={['population', 'density', 'area']} />
    )
    expect(Wrapper).toHaveBeenCalledTimes(2)
    expect(screen.queryByText(/density/i)).not.toBeInTheDocument()
    expect(screen.queryByText(/population/i)).not.toBeInTheDocument()
    expect(screen.queryByText(/area/i)).not.toBeInTheDocument()
  })

})