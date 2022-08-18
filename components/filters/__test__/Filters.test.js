import { screen, render } from '@testing-library/react'
import { toBeInTheDocument } from '@testing-library/jest-dom'
import userEvent from '@testing-library/user-event'

import { FieldsContextProvider } from '../../context/FieldsContext'
import Filters from '../Filters'
import filterDataMock from '../../../__mock__/data/filterDataMock'
import IconFilters from '../../svgSnippets/IconFilters'
import Collapse from '../../general/Collapse'
import RegionFilter from '../region/RegionFilter'
import NumberFilter from '../number/NumberFilter'

jest.mock('../../svgSnippets/IconFilters')
jest.mock('../../general/Collapse', () => {
  return jest.fn((props) => <>{props.children}</>)
})
jest.mock('../region/RegionFilter')
jest.mock('../number/NumberFilter')

describe('components/filters/Filters', () => {
  test('It renders', () => {
    const { container } = render(
      <FieldsContextProvider>
        <Filters filterData={filterDataMock}/>
      </FieldsContextProvider>
    )
    expect(container.querySelector('.site__filters')).toBeInTheDocument()
    expect(container.querySelector('.filters__title')).toBeInTheDocument()
    expect(container.querySelector('.filters__title')).toHaveTextContent(/filter by/i)
    expect(IconFilters).toHaveBeenCalledTimes(2)
    expect(screen.getByRole('button', { name: /filter by/i })).toBeInTheDocument()

    // toggle container
    expect(container.querySelector('.filters')).toBeInTheDocument()
    expect(Collapse).toHaveBeenCalledTimes(4)
    expect(RegionFilter).toHaveBeenCalledTimes(1)
    expect(NumberFilter).toHaveBeenCalledTimes(3)
  })

  test('It can toggle correctly', async () => {
    const { container } = render(
      <FieldsContextProvider>
        <Filters filterData={filterDataMock}/>
      </FieldsContextProvider>
    )
    const button = screen.getByRole('button', { name: /filter by/i })
    const filters = container.querySelector('.filters')
    const User = userEvent.setup()
    // check initial state
    expect(button).not.toHaveClass('filters__toggle-button--active')
    expect(filters).toHaveClass('filters--closed')

    // simulate button click
    await User.click(button)

    // check classes
    expect(button).toHaveClass('filters__toggle-button--active')
    expect(filters).toHaveClass('filters--open')

    // some more clicks
    await User.click(button)
    await User.click(button)
    await User.click(button)

    // check classes
    expect(button).not.toHaveClass('filters__toggle-button--active')
    expect(filters).toHaveClass('filters--closed')
  })
})