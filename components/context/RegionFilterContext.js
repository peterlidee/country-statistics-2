import React, { useState } from "react";
import { fillArrayWithBool } from "../../lib/helpers";

const RegionFilterContext = React.createContext({
  regionFilter: {},
  handleRegionFilter: () => {},
  handleSubregionFilter: () => {},
  handleRegionClear: () => {},
})

const RegionFilterContextProvider = props => {

  // this holds the state for all regions and subregions
  // { region: { regionActive: bool, subRegionNames: [String, ...], subregionActive[bool, ...] }, ...}
  const [ regionFilter, setRegionFilter ] = useState(props.defaultRegionState);

  // toggle regionActive to true or false
  // toggle all subregionActive to true/false if regionActive is true/false
  const handleRegionFilter = (regionName) => {
    setRegionFilter({
      ...regionFilter,
      [regionName]: {
        regionActive: !regionFilter[regionName].regionActive,
        subregionNames: regionFilter[regionName].subregionNames,
        subregionActive: !regionFilter[regionName].regionActive ? fillArrayWithBool(regionFilter[regionName].subregionNames.length, true) : fillArrayWithBool(regionFilter[regionName].subregionNames.length, false),
      }
    });
  };

  // 1. 
  // take the region of the subregion and make a copy of its subregionActive array
  // apple the changes (make subregion true/false)
  // 2.
  // if a subregion is set to true, it's region has to be set to false
  // unless all of the subregions are active
  const handleSubregionFilter = (regionName, index) => {
    // 1.
    const subregionActiveCopy = [...regionFilter[regionName].subregionActive];
    subregionActiveCopy[index] = !subregionActiveCopy[index];
    // 2.
    const regionActive = subregionActiveCopy[index] ? subregionActiveCopy.every(item => item) ? true : false : false;
    
    setRegionFilter({
      ...regionFilter,
      [regionName]: {
        // 2.
        regionActive: regionActive,
        subregionNames: regionFilter[regionName].subregionNames,
        subregionActive: subregionActiveCopy,
      }
    })
  }

  const handleRegionClear = () => {
    setRegionFilter(props.defaultRegionState)
  }

  return(
    <RegionFilterContext.Provider value={{ 
      regionFilter,
      handleRegionFilter,
      handleSubregionFilter,
      handleRegionClear,
    }}>
        {props.children}
    </RegionFilterContext.Provider>
  )
}

export default RegionFilterContext;
export { RegionFilterContextProvider };