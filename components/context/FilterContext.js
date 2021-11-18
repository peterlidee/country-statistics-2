import React, { useState } from "react";

const FilterContext = React.createContext({
  filters: [],
  handleFilters: () => {},
  regionFilter: {},
  setRegionFilter: () => {},
})

const FilterContextProvider = props => {

  // this holds the state for all regions and subregions
  // { region: { regionActive: bool, subRegionNames: [String, ...], subregionActive[bool, ...] }, ...}
  const [ regionFilter, setRegionFilter ] = useState(props.defaultRegionState);

  const handleRegionFilter = () => {
    
  }

  return(
    <FilterContext.Provider value={{ 
      filters, 
      handleFilters,
      regionFilter,
    }}>
        {props.children}
    </FilterContext.Provider>
  )
}

export default FilterContext;
export { FilterContextProvider };