import fieldsData from '../../components/fields/fieldsData'
import validateNumbersQuery from './validateNumbersQuery'
import isNumberFilterActive from './isNumberFilterActive'

// this function returns 
// - activeNumberFilters: array of string
// - currentSelections: object with all numberFilters as keys and either the current selection or defaults as values

export default function getNumberQueryData(hiddenFields, routerQuery, filterData){

  // 1. find out what fields to use: number + not hidden
  const visibleNumberFilters = fieldsData
    .filter(field => field.sortType === 'number' && !hiddenFields.includes(field.slug))
    .map(field => field.slug)

  // 2. for each visibleNumberFilter, get the value from query and validate it (or set to default)
  const currentSelections = {}
  visibleNumberFilters.map(visibleNumberFilter => {
    const currentSelection = validateNumbersQuery(routerQuery[visibleNumberFilter], [filterData[visibleNumberFilter].sliderStart, filterData[visibleNumberFilter].sliderEnd])
    // add to currentSelections
    currentSelections[visibleNumberFilter] = currentSelection
  })

  // 3. filter activeFilters from visibleNumberFilters
  const activeNumberFilters = visibleNumberFilters.filter(visibleNumberFilter => isNumberFilterActive(currentSelections[visibleNumberFilter], [filterData[visibleNumberFilter].sliderStart, filterData[visibleNumberFilter].sliderEnd]))

  return { activeNumberFilters, currentSelections }
}