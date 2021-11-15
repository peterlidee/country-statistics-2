import React, { useState } from "react";

const FilterContext = React.createContext({
  filters: [],
  handleFilters: () => {},
})

const FilterContextProvider = props => {

  const [ filters, setFilters ] = useState([
    {
      name: 'region',
      label: 'Region',
      type: 'text',
    },
    {
      name: 'subregion',
      label: 'Subregion',
      type: 'text',
    },
    {
      name: 'population',
      label: 'Population',
      type: 'number',
    },
    {
      name: 'area',
      label: 'Area',
      type: 'number',
    },
    {
      name: 'density',
      label: 'Density',
      type: 'number',
    },
  ]);

  const handleFilters = () => {
    return null;
  }

  return(
    <FilterContext.Provider value={{ 
      filters, 
      handleFilters,
    }}>
        {props.children}
    </FilterContext.Provider>
  )
}

export default FilterContext;
export { FilterContextProvider };