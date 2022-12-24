import { screen, render } from '@testing-library/react'

import Filters from '../Filters'
import IconFilters from '../../svgSnippets/IconFilters'
import FiltersToggle from '../FiltersToggle'
import Collapse from '../../general/Collapse'
import RegionFilter from '../region/RegionFilter'
import NumberFilter from '../number/NumberFilter'

import filterDataMock from '../../../__mock__/data/filterDataMock'

jest.mock('../../svgSnippets/IconFilters')
jest.mock('../FiltersToggle', () => {
  return jest.fn((props) => <>{props.children}</>)
})
jest.mock('../../general/Collapse', () => {
  return jest.fn((props) => <>{props.children}</>)
})
jest.mock('../region/RegionFilter')
jest.mock('../number/NumberFilter')

describe('components/filters/Filters', () => {

  test('It renders', () => {
    render(
      <Filters hiddenFields={[]} filterData={filterDataMock}/>
    )

    expect(IconFilters).toHaveBeenCalledTimes(1)
    expect(screen.getByText(/filter by/i)).toBeInTheDocument()
    expect(FiltersToggle).toHaveBeenCalled()
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