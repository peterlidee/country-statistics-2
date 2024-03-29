import { useState } from 'react'
import FilterRow from './FilterRow'
import PropTypes from 'prop-types'

// This function returns a filterblock for a region and optionally subregions
// it contains a custom collapse if there are subregions
// else if will just return a filterrow component

function SubregionToggle(props){
  // label of name, active, handler, count, children, hasSubfilter
  const [ open, setOpen ] = useState(false)
  const displayStyle = { 'display': open ? 'block': 'none' }

  return(
    <>
      <FilterRow 
        filterCheckbox={props.filterCheckbox}
        filterCheckboxCount={props.filterCheckboxCount}
      >
        {props.children && 
          <button className="collapse__controller collapse__controller--subfilter" onClick={() => setOpen(!open)}>
            <span className="collapse__status collapse__status--subfilter">{open ? "-" : "+"}</span>
            <span className="collapse__label collapse__label--subfilter">subregions</span>
          </button>
        }
      </FilterRow>
      {props.children &&
        <div className="collapse__content collapse__content--subfilter" style={displayStyle}>
          {props.children}
        </div>
      }
    </>
  )
}

SubregionToggle.propTypes = {
  filterCheckbox: PropTypes.object.isRequired,
  filterCheckboxCount: PropTypes.object.isRequired,
}

export default SubregionToggle;