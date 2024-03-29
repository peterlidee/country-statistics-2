import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'

import validateNumbersAgainstDefaults from '../../../lib/numberFilter/validateNumbersAgainstDefaults'
import FilterRange from './FilterRange'

import PropTypes from 'prop-types'

function NumberFilter({ filter, currFilterData, activeNumbers }){

  const router = useRouter()

  // take the current filter out of props.currentSelections
  const filterSelection = activeNumbers.currentSelections[filter]
  
  // setup local state
  // populate it with the default sliderStart and sliderEnd values ( = all selected)
  const [inputChange, setInputChange] = useState(filterSelection)
  const [sliderSelection, setSliderSelection] = useState(filterSelection)

  // when the logo is clicked, the component rerenders but the inner state: inputChange and sliderSelection remains
  // so, we listen for router change and no query
  // when this happens, we reset the state to the defaults
  useEffect(() => {
    if(Object.keys(router.query).length === 0){
      setInputChange(filterSelection)
      setSliderSelection(filterSelection)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.query])

  // these handle the input changes, so basic controlled inputs, linked to inputChange state hook
  const handleInputChange = (val) => {
    setInputChange(val)
  }
  // this handles the filter button on the controlled inputs, it sets context
  const handleInputSelection = () => {
    // validate inputValues
    const validatedInputValues = validateNumbersAgainstDefaults(inputChange[0], inputChange[1], [currFilterData.sliderStart, currFilterData.sliderEnd])
    // update states
    filterHandler(validatedInputValues)
    setSliderSelection(validatedInputValues);
    setInputChange(validatedInputValues);
  }
  // handle slider on drag
  // (slider on drag stop is handled by context handler [filter]Selection)
  const handleSliderSelection = (val) => {
    setInputChange(val);
    setSliderSelection(val);
  }
  // shallow push the new selection to router
  const filterHandler = (inputValues) => {
    router.push(
      { path: '/', query: {
        ...router.query, [filter] : inputValues.join(','),
      }},
      undefined,
      { shallow: true }
    )
  }
  const clearFilter = () => {
    const defaultValues = [currFilterData.sliderStart, currFilterData.sliderEnd];
    setInputChange(defaultValues);
    setSliderSelection(defaultValues);
    filterHandler(defaultValues)
  }

  return(
    <div className="filter">
      <div className="filter__block__number">
        <FilterRange 
          min={currFilterData.sliderStart} 
          max={currFilterData.sliderEnd} 
          steps={currFilterData.sliderStep}
          sliderSelection={sliderSelection} 
          handleSliderSelection={handleSliderSelection}
          sliderFinalSelection={filterSelection} 
          handleSliderFinalSelection={filterHandler}
        />
        <div className="number-filter__input-grid">
          <div className="number-filter__input-grid-item">
            <label htmlFor={`numberfilter-${filter}-from`} className="number-filter__label">from</label>
            <input 
              className="number-filter__input"
              type="number" 
              id={`numberfilter-${filter}-from`} 
              min={currFilterData.sliderStart} 
              max={currFilterData.sliderEnd} 
              value={inputChange[0]} 
              onChange={(e) => handleInputChange([Number(e.target.value), inputChange[1]])} 
            />
          </div>
          <div className="number-filter__input-grid-item">
            <label htmlFor={`numberfilter-${filter}-to`} className="number-filter__label">to</label>
            <input 
             className="number-filter__input"
              type="number" 
              id={`numberfilter-${filter}-to`} 
              min={currFilterData.sliderStart} 
              max={currFilterData.sliderEnd} 
              value={inputChange[1]} 
              onChange={(e) => handleInputChange([inputChange[0], Number(e.target.value)])} 
              />
          </div>
          <button onClick={handleInputSelection} className="number-filter__submit">&gt;</button>
        </div>
      </div>
      <button onClick={clearFilter} className="filter__clear-button">clear</button>
    </div>
  )
}

NumberFilter.propTypes = {
  filter: PropTypes.string.isRequired,
  currFilterData: PropTypes.object.isRequired,
  activeNumbers: PropTypes.object.isRequired,
}

export default NumberFilter