import { useContext } from 'react'
import { useRouter } from 'next/router'

import RegionFilterContext2 from '../../context/RegionFilterContext2'
import FilterBlockRegion from './FilterBlockRegion'
import FilterRow from './FilterRow'

function RegionFilter(){

  const { regionNames, regionsAndSubregions, regionsAndSubregionsIndexes } = useContext(RegionFilterContext2)
  const router = useRouter()
  // get current active regions, we will pass these all the way through to FilterCheckBox
  const activeRegions = router.query.regions && router.query.regions !== '' ? router.query.regions.split(',') : []

  function clearRegionFilter(){
    // take copy of query and delete regions prop
    const query = {...router.query}
    delete query.regions
    router.push(
      { path: '/', query }, 
      undefined,
      { shallow: true }
    )
  }

  return(
    <div className="filter filter--region">
      {regionNames.sort().map(regionName => (
        <FilterBlockRegion
          key={`region-filter-${regionName}`}
          name={regionName} 
          region={undefined}
          activeRegions={activeRegions} 
          count={regionsAndSubregionsIndexes[regionName].length}
          hasSubFilter={regionsAndSubregions[regionName].subregionNames.length > 0}
        >
          {(regionsAndSubregions[regionName].subregionNames.length > 0) && 
            <div className="filter__block__subregion">
              {/* one block for all the subregions */}
              {regionsAndSubregions[regionName].subregionNames.map((subregionName, i) => (
                <FilterRow 
                  key={`subregion-filter-${subregionName}`}
                  name={subregionName} 
                  region={regionName}
                  activeRegions={activeRegions}
                  count={regionsAndSubregionsIndexes[subregionName].length}
                />
              ))}
            </div>
          }
        </FilterBlockRegion>
      ))}
      <button onClick={clearRegionFilter} className="filter__clear-button">clear</button>
    </div>
  )
}

export default RegionFilter;  