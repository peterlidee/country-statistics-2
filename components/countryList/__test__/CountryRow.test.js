import { screen, render } from '@testing-library/react'
import { toBeInTheDocument, toContainElement } from '@testing-library/jest-dom'

import { FieldsContextProvider } from '../../context/FieldsContext'
import countriesMock from '../../../__mock__/data/countriesMock'
import CountryRow from '../CountryRow'
import Wrapper from '../../general/Wrapper'

const { extraDataCountries } = countriesMock

jest.mock('../../general/Wrapper', () => {
  return jest.fn((props) => <div className='Wrapper'>{props.children}</div>)
})

describe('components/countryList/CountryRow', () => {
  test('It renders', () => {
    const { container } = render(
      <FieldsContextProvider>
        <CountryRow country={extraDataCountries[0]} index={0} />
      </FieldsContextProvider>
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
})