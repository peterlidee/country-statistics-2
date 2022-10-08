import React from 'react'

const RegionFilterContext = React.createContext({
  regionNames: [],
  regionsAndSubregions: {},
  regionsAndSubregionsIndexes: {},
})

const RegionFilterContextProvider = props => {
  return(
    <RegionFilterContext.Provider value={{ 
      regionNames: Object.keys(props.filterData.defaultRegionState),
      regionsAndSubregions: props.filterData.defaultRegionState,
      regionsAndSubregionsIndexes: props.filterData.regionIndexes,
    }}>
      {props.children}
    </RegionFilterContext.Provider>
  )
}

export default RegionFilterContext;
export { RegionFilterContextProvider };