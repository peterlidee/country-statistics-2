import PropTypes from 'prop-types'
import FilterCheckBox from './FilterCheckbox'

// this function return a filterrow (or a subfilter-row)
// checkbox, label, count and optionally a toggle button for a subfilter
// the optional togglebutton get passed as props.children
function FilterRow(props){
  return(
    <div className="filter__row">
      <FilterCheckBox 
        name={props.name} 
        activeRegions={props.activeRegions} 
        region={props.region}
      />
      <span className="filtercheckbox__count">
        (<span className="filtercheckbox__count-inner">{props.count}</span>)
      </span>
      {props.children}
    </div>
  )
}

FilterRow.propTypes = {
  name: PropTypes.string.isRequired,
  // region can be undefined or string
  activeRegions: PropTypes.array.isRequired,
  count: PropTypes.number.isRequired,
}

export default FilterRow;