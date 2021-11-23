import React, { useState } from "react";
import { fillArrayWithBool } from "../../lib/helpers";

const RegionFilterContext = React.createContext({
  regionFilter: {},
  handleRegionFilter: () => {},
  handleSubregionFilter: () => {},
  handleRegionClear: () => {},
  getActiveRegionfilters: () => {},
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

  // this function checks if there are active region filters
  // it there are none, it returns []
  // if there are, it returns a flat array of all the active regions and subregions
  const getActiveRegionfilters = () => {
    const actives = []
    Object.keys(regionFilter).map(currRegion => {
      // if the region is active, the subregions are also included
      if(regionFilter[currRegion].regionActive){
        actives.push(currRegion);
      }else{
        // if there are subregions
        if(regionFilter[currRegion].subregionNames.length > 0){
          // loop over them to see if any of them is active
          for(let i = 0; i < regionFilter[currRegion].subregionNames.length; i++){
            // active then push
            if(regionFilter[currRegion].subregionActive[i]) actives.push(regionFilter[currRegion].subregionNames[i]);
          }
        }
      }
    })
    return actives;
  }

  return(
    <RegionFilterContext.Provider value={{ 
      regionFilter,
      handleRegionFilter,
      handleSubregionFilter,
      handleRegionClear,
      getActiveRegionfilters,
    }}>
        {props.children}
    </RegionFilterContext.Provider>
  )
}

export default RegionFilterContext;
export { RegionFilterContextProvider };