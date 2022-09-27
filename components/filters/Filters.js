import RegionFilter from './region/RegionFilter'
import NumberFilter from './number/NumberFilter'
import Collapse from '../general/Collapse'

import PropTypes from 'prop-types'
import IconFilters from '../svgSnippets/IconFilters'

import fieldsData from '../fields/fieldsData'
import FiltersToggle from './FiltersToggle'

function Filters(props){

  // check if the field / filter is to be displayed
  const filters = ["region"];  

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
        {filters.map((filter, i) =>
          <Collapse label={filter} key={`collapse-${filter}`} extraClass="filter">
            {filter == "region" && <RegionFilter regionIndexes={props.filterData.regionIndexes} />}
            {filter !== "region" && <NumberFilter filter={filter} currFilterData={props.filterData[filter]} />}
          </Collapse>
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