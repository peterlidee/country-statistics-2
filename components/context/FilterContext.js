import React from "react";

const FilterContext = React.createContext({
  filters: [],
  handleFilters: () => {},
  toggleFilters: () => {},
})

const FilterContextProvider = props => {

  const handleFilters = () => {
    return null;
  }

  const toggleFilters = () => {
    
  }

  const filters = [
    {
      filter: 'region',
      label: 'Region',
      type: 'text',
      open: false,
    },
    {
      filter: 'subregion',
      label: 'Subregion',
      type: 'text',
      open: false,
    },
    {
      filter: 'population',
      label: 'Population',
      type: 'number',
      open: false,
    },
    {
      filter: 'area',
      label: 'Area',
      type: 'number',
      open: false,
    },
    {
      filter: 'density',
      label: 'Density',
      type: 'number',
      open: false,
    },
  ]

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