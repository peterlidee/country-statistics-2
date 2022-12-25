import fieldsData from '../fields/fieldsData'
import IconFilters from '../svgSnippets/IconFilters'
import FiltersToggle from './FiltersToggle'
import Collapse from '../general/Collapse'
import RegionFilter from './region/RegionFilter'
import NumberFilter from './number/NumberFilter'

import PropTypes from 'prop-types'
import isFilterActive from '../../lib/filter/isFilterActive'

// TODO: on hard reload, the regions subregions may be invalid without causing crash

function Filters(props){

  // check if the field / filter is to be displayed
  const filters = ["regions"];  

  // add the active filters (hiddable && not in hiddenFields)
  fieldsData.map(field => {
    if(field.displayToggle && !props.hiddenFields.includes(field.slug)){
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
        {filters.map((filter) => {


        console.log('isFilterActive',filter, isFilterActive(filter, router.query, props.filterData.regionIndexes))


          
        
          return <Collapse 
            label={filter} 
            key={`collapse-${filter}`} 
            extraClass="filter"
          >
            {filter == "regions" && 
              <RegionFilter 
                regionsAndSubregions={props.filterData.defaultRegionState}
                regionsAndSubregionsIndexes={props.filterData.regionIndexes} />
            }
            {filter !== "regions" && 
              <NumberFilter 
                filter={filter} 
                currFilterData={props.filterData[filter]} />
            }
          </Collapse>
          }
        )}
      </FiltersToggle>
    </aside>
  )
}

Filters.propTypes = {
  hiddenFields: PropTypes.array.isRequired,
  filterData: PropTypes.object.isRequired,
}

export default Filters;