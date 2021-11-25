import PropTypes from 'prop-types';
import FilterCheckBox from './FilterCheckbox';

// this function return a filterrow (or a subfilter-row)
// checkbox, label, count and optionally a toggle button for a subfilter
// the optional togglebutton get passed as props.children
function FilterRow(props){
  return(
    <div className="filter__row">
      <FilterCheckBox 
        label={props.name} 
        active={props.active} 
        handler={props.handler} 
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
  active: PropTypes.bool.isRequired,
  handler: PropTypes.func.isRequired,
  count: PropTypes.number.isRequired,
}

export default FilterRow;