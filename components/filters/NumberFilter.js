import { useContext, useState } from "react";
import NumberFiltersContext from "../context/NumberFiltersContext";
import FilterRange from "./FilterRange";
import PropTypes from 'prop-types';

function NumberFilter(props){

  // get data from context
  const { 
    areaSelection, 
    setAreaSelection, 
    populationSelection, 
    setPopulationSelection, 
    densitySelection, 
    setDensitySelection,
  } = useContext(NumberFiltersContext);

  // depending on what filter we're rendering, we need a different selection and handler,
  // we set them here
  const currContext = {
    area: {
      selection: areaSelection,
      handler: setAreaSelection,   
    },
    population: {
      selection: populationSelection,
      handler: setPopulationSelection,   
    },
    density: {
      selection: densitySelection,
      handler: setDensitySelection,   
    },
  }

  // setup local state
  // populate it with the default sliderStart and sliderEnd values ( = all selected)
  const [inputChange, setInputChange] = useState(currContext[props.filter].selection)
  const [sliderSelection, setSliderSelection] = useState(currContext[props.filter].selection)

  // these handle the input changes, so basic controlled inputs, linked to inputChange state hook
  const handleInputChange = (val) => {
    setInputChange(val)
  }
  // this handles the filter button on the controlled inputs, it sets context
  const handleInputSelection = () => {
    // we need some validation before we set these to context
    // val > min && val < max
    const val1 = inputChange[0] > props.currFilterData.sliderStart ? inputChange[0] < props.currFilterData.sliderEnd ? inputChange[0] : props.currFilterData.sliderEnd : props.currFilterData.sliderStart;
    const val2 = inputChange[1] > props.currFilterData.sliderStart ? inputChange[1] < props.currFilterData.sliderEnd ? inputChange[1] : props.currFilterData.sliderEnd : props.currFilterData.sliderStart;
    // if min < max
    const inputValues = val1 < val2 ? [val1,val2] : [val2, val1];
    currContext[props.filter].handler(inputValues);
    setSliderSelection(inputValues);
    setInputChange(inputValues);
  }
  // handle slider on drag
  // (slider on drag stop is handled by context handler [filter]Selection)
  const handleSliderSelection = (val) => {
    setInputChange(val);
    setSliderSelection(val);
  }
  const clearFilter = () => {
    const defaultValues = [props.currFilterData.sliderStart, props.currFilterData.sliderEnd];
    // set inputs
    setInputChange(defaultValues);
    // set slider
    setSliderSelection(defaultValues);
    // set context
    currContext[props.filter].handler(defaultValues);
  }

  return(
    <div>
      <FilterRange 
        min={props.currFilterData.sliderStart} 
        max={props.currFilterData.sliderEnd} 
        steps={props.currFilterData.sliderStep}
        sliderSelection={sliderSelection} 
        handleSliderSelection={handleSliderSelection}
        sliderFinalSelection={currContext[props.filter].selection} 
        handleSliderFinalSelection={currContext[props.filter].handler}
      />
      <div>
        <label htmlFor={`numberfilter-${props.filter}-from`}>from</label>
        <input 
          type="number" 
          id={`numberfilter-${props.filter}-from`} 
          min={props.currFilterData.sliderStart} 
          max={props.currFilterData.sliderEnd} 
          value={inputChange[0]} 
          onChange={(e) => handleInputChange([Number(e.target.value), inputChange[1]])} 
        />
        <label htmlFor={`numberfilter-${props.filter}-to`}>to</label>
        <input 
          type="number" 
          id={`numberfilter-${props.filter}-to`} 
          min={props.currFilterData.sliderStart} 
          max={props.currFilterData.sliderEnd} 
          value={inputChange[1]} 
          onChange={(e) => handleInputChange([inputChange[0], Number(e.target.value)])} 
          />
        <button onClick={handleInputSelection}>filter</button>
      </div>
      <button onClick={clearFilter}>
        clear
      </button>
    </div>
  )
}

NumberFilter.propTypes = {
  filter: PropTypes.string.isRequired,
  currFilterData: PropTypes.object.isRequired,
}

export default NumberFilter;