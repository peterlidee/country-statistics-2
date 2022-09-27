import RegionFilter from './region/RegionFilter'
import NumberFilter from './number/NumberFilter'
import Collapse from '../general/Collapse'

import PropTypes from 'prop-types'
import { useState } from 'react'
import IconFilters from '../svgSnippets/IconFilters'

import fieldsData from '../fields/fieldsData'

function Filters(props){

  const filters = ["region"];  
  // check if the field / filter is to be displayed

  // get the active filters (hiddable && not in hiddenFields)
  fieldsData.map(field => {
    if(field.displayToggle && !props.hiddenFields.includes(field.slug)){
      filters.push(field.slug)
    }
  })

  const [ toggle, setToggle ] = useState(false);
  const buttonClass=  toggle ? 'filters__toggle-button filters__toggle-button--active' : 'filters__toggle-button';
  const toggleClass = toggle ? 'filters filters--open' : 'filters filters--closed';

  return(
    <aside className="site__filters">
      <div className="filters__title">
        <IconFilters />
        filter by
      </div>
      <button 
        className={buttonClass} 
        onClick={() => setToggle(!toggle)}
      >
        <IconFilters />
        <span>filter by</span>
      </button>
      <div className={toggleClass}>
        {filters.map((filter, i) =>
          <Collapse label={filter} key={`collapse-${filter}`} extraClass="filter">
            {filter == "region" && <RegionFilter regionIndexes={props.filterData.regionIndexes} />}
            {filter !== "region" && <NumberFilter filter={filter} currFilterData={props.filterData[filter]} />}
          </Collapse>
        )}
      </div>
    </aside>
  )
}

Filters.propTypes = {
  hiddenFields: PropTypes.array.isRequired,
  filterData: PropTypes.object.isRequired,
}

export default Filters;