import { screen, render } from '@testing-library/react'
import { toBeInTheDocument } from '@testing-library/jest-dom'

import CountryListHeader from '../CountryListHeader'
import Wrapper from '../../general/Wrapper'
import IconSort from '../../svgSnippets/IconSort'
// import FieldsContext

jest.mock('../../general/Wrapper', () => {
  return jest.fn((props) => <div data-testid="Wrapper">{props.children}</div>)
})
jest.mock('../../svgSnippets/IconSort')

describe('components/countryList/CountryListHeader', () => {
  test('It return nothing when no field.display', () => {
    render(<CountryListHeader field={{}} />)
    expect(Wrapper).not.toHaveBeenCalled()
    expect(screen.queryByRole('button')).not.toBeInTheDocument()
  })
  test('It renders', () => {
    render(<CountryListHeader field={{ 
      display: true,
      field: 'test',
      label: 'label',
      sortActive: true,
      sortAsc: true,
    }} handleSort={() => {}} />)
    expect(Wrapper).toHaveBeenCalled()
    expect(IconSort).toHaveBeenCalledWith(
      expect.objectContaining({
        sortActive: true,
        sortAsc: true,
      }),
      expect.anything()
    )
    const button = screen.getByRole('button')
    expect(button).toBeInTheDocument()
    expect(button).toHaveTextContent('label')
    expect(button).toHaveClass('button__sort--test')
  })
})