import { screen, render } from '@testing-library/react'
import { toBeInTheDocument } from '@testing-library/jest-dom'
import userEvent from '@testing-library/user-event'

import Filters from '../Filters'
import FiltersToggle from '../FiltersToggle'
import filterDataMock from '../../../__mock__/data/filterDataMock'
import IconFilters from '../../svgSnippets/IconFilters'
import Collapse from '../../general/Collapse'
import RegionFilter from '../region/RegionFilter'
import NumberFilter from '../number/NumberFilter'

jest.mock('../../svgSnippets/IconFilters')
jest.mock('../FiltersToggle', () => {
  return jest.fn((props) => <>{props.children}</>)
})
jest.mock('../../general/Collapse', () => {
  return jest.fn((props) => <>{props.children}</>)
})
jest.mock('../region/RegionFilter')
jest.mock('../number/NumberFilter')

beforeEach(() => {
  jest.clearAllMocks()
})

describe('components/filters/Filters', () => {

  test('It renders', () => {
    const { container } = render(
      <Filters hiddenFields={[]} filterData={filterDataMock}/>
    )
    expect(container.querySelector('.site__filters')).toBeInTheDocument()
    expect(container.querySelector('.filters__title')).toBeInTheDocument()
    expect(IconFilters).toHaveBeenCalledTimes(1)
    expect(container.querySelector('.filters__title')).toHaveTextContent(/filter by/i)

    expect(Collapse).toHaveBeenCalledTimes(4)
    expect(RegionFilter).toHaveBeenCalledTimes(1)
    expect(NumberFilter).toHaveBeenCalledTimes(3)
  })

  test('It correctly hides value population', () => {
    render(<Filters hiddenFields={['population']} filterData={filterDataMock}/>)
    expect(Collapse).toHaveBeenCalledTimes(3)
    expect(NumberFilter).toHaveBeenCalledTimes(2)
  })

  test('It correctly hides value population, area and density', () => {
    render(<Filters hiddenFields={['population', 'area', 'density']} filterData={filterDataMock}/>)
    expect(Collapse).toHaveBeenCalledTimes(1)
    expect(NumberFilter).not.toHaveBeenCalled()
  })

})