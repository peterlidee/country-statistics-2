import React, { useState } from "react";

const NumberFiltersContext = React.createContext({
  areaSelection: [],
  setAreaSelection: () => {},
  populationSelection: [],
  setPopulationSelection: () => {},
  densitySelection: [],
  setDensitySelection: () => {},
  numberFilterIsActive: () => {},
})

const NumberFiltersContextProvider = (props) => { // props = filterData

  const [ areaSelection, setAreaSelection ] = useState([props.filterData.area.sliderStart, props.filterData.area.sliderEnd]);
  const [ populationSelection, setPopulationSelection ] = useState([props.filterData.population.sliderStart, props.filterData.population.sliderEnd]);
  const [ densitySelection, setDensitySelection ] = useState([props.filterData.density.sliderStart, props.filterData.density.sliderEnd]);

  const selections = {
    area: areaSelection,
    population: populationSelection,
    density: densitySelection,
  }

  // this is a helper function,
  // it checks if [filter] is active by
  // comparing it's values with the sliderStart and sliderEnd value from prop.filterData
  // (when they are the same, the filter is not active / entire range is selected)
  const numberFilterIsActive = (filter) => {
    if(selections[filter][0] == props.filterData[filter].sliderStart && selections[filter][1] == props.filterData[filter].sliderEnd){
      return false;
    }
    return true;
  }

  return(
    <NumberFiltersContext.Provider value={{ 
      areaSelection,
      setAreaSelection,
      populationSelection,
      setPopulationSelection,
      densitySelection,
      setDensitySelection,
      numberFilterIsActive,
    }}>
        {props.children}
    </NumberFiltersContext.Provider>
  )
}

export default NumberFiltersContext;
export { NumberFiltersContextProvider };

