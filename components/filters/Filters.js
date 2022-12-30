import fieldsData from '../fields/fieldsData'
import IconFilters from '../svgSnippets/IconFilters'
import FiltersToggle from './FiltersToggle'
import Collapse from '../general/Collapse'
import isFilterActive from '../../lib/filter/isFilterActive'
import RegionFilter from './region/RegionFilter'
import NumberFilter from './number/NumberFilter'

import PropTypes from 'prop-types'

// TODO: on hard reload, the regions subregions may be invalid without causing crash
// TODO on hard reload check faulty hide query value

function Filters({ filterData, activeHidden, activeRegions, activeNumbers }){

  // check if the field / filter is to be displayed
  const filters = ["regions"];  

  // add the active filters (hiddable && not in activeHidden)
  fieldsData.map(field => {
    if(field.displayToggle && !activeHidden.includes(field.slug)){
      filters.push(field.slug)
    }
  })

  return(
    <aside className="site__filters">
      <div className="filters__title">
        <IconFilters />
        filter by
      </div>
      <FiltersToggle>
        {filters.map((filter) => (
          <Collapse 
            key={`collapse-${filter}`}
            label={filter}
            boldLabel={isFilterActive(filter, activeRegions, activeNumbers)}
            extraClass="filter"
          >
            {filter == "regions" && 
              <RegionFilter 
                regionsAndSubregions={filterData.defaultRegionState}
                regionsAndSubregionsIndexes={filterData.regionIndexes} 
                activeRegions={activeRegions} />
            }
            {filter !== "regions" && 
              <NumberFilter 
                filter={filter} 
                currFilterData={filterData[filter]}
                activeNumbers={activeNumbers} />
            }
          </Collapse>
        ))}
      </FiltersToggle>
    </aside>
  )
}

Filters.propTypes = {
  filterData: PropTypes.object.isRequired,
  activeHidden: PropTypes.array.isRequired,
  activeRegions: PropTypes.array.isRequired,
  activeNumbers: PropTypes.object.isRequired,
}

export default Filters;