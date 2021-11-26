import { useState } from 'react';
import FilterRow from './FilterRow';
import PropTypes from 'prop-types';

// This function returns a filterblock for a region and optionally subregions
// it contains a custom collapse if there are subregions
// else if will just return a filterrow component

function FilterBlockRegion(props){
  // label of name, active, handler, count, children, hasSubfilter
  const [ open, setOpen ] = useState(false);
  const displayStyle = { 'display': open ? 'block': 'none' }
  return(
    <div className="filter__block__region">
      {/* one block per region */}
      <FilterRow 
        name={props.name} 
        active={props.active} 
        handler={props.handler}
        count={props.count}
      >
        {props.hasSubFilter && 
          <button className="collapse__controller collapse__controller--subfilter" onClick={() => setOpen(!open)}>
            <span className="collapse__status collapse__status--subfilter">{open ? "-" : "+"}</span>
            <span className="collapse__label collapse__label--subfilter">subregions</span>
          </button>
        }
      </FilterRow>
      {props.hasSubFilter &&
        <div className="collapse__content collapse__content--subfilter" style={displayStyle}>
          {props.children}
        </div>
      }
    </div>
  )
}

FilterBlockRegion.propTypes = {
  name: PropTypes.string.isRequired,
  active: PropTypes.bool.isRequired,
  handler: PropTypes.func.isRequired,
  count: PropTypes.number.isRequired,
  hasSubFilter: PropTypes.bool.isRequired,
}

export default FilterBlockRegion;