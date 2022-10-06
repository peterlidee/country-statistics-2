import fieldsData from '../../components/fields/fieldsData'
import validateQueryValue from './validateQueryValue'
import isNumberFilterActive from './isNumberFilterActive'
import filterCountriesByNumbers from './filterCountriesByNumbers'

// this function filters countries by numberFilters + all preparations before we can actually filter
// it returns the original country array when there were no active filters, else the filtered country array

export default function applyNumberFilters(hiddenFields, routerQuery, filterData, countries){

  // 1. find out what fields to use: number + not hidden
  const visibleNumberFilters = fieldsData
    .filter(field => field.sortType === 'number' && !hiddenFields.includes(field.slug))
    .map(field => field.slug)

  // 2. for each visibleNumberFilter, get the value from query and validate it (or set to default)
  const currentSelections = {}
  visibleNumberFilters.map(visibleNumberFilter => {
    const currentSelection = validateQueryValue(routerQuery[visibleNumberFilter], [filterData[visibleNumberFilter].sliderStart, filterData[visibleNumberFilter].sliderEnd])
    // add to currentSelections
    currentSelections[visibleNumberFilter] = currentSelection
  })

  // 3. filter activeFilters from visibleNumberFilters
  const activeNumberFilters = visibleNumberFilters.filter(visibleNumberFilter => isNumberFilterActive(currentSelections[visibleNumberFilter], [filterData[visibleNumberFilter].sliderStart, filterData[visibleNumberFilter].sliderEnd]))

  // 4. now that we have all of the required data, do the actual filtering
  const countriesFilteredByNumbers = filterCountriesByNumbers(countries, activeNumberFilters, currentSelections);

  // 5. return filtered countries
  return countriesFilteredByNumbers
}