import PropTypes from 'prop-types'

// this function returns a filterrow (or a subfilter-row)
// checkbox and label, count and optionally a toggle button for a subfilter
// the optional togglebutton gets passed as props.children
function FilterRow({ filterCheckbox, filterCheckboxCount, children }){
  return(
    <div className="filter__row">
      {filterCheckbox}
      {filterCheckboxCount}
      {children}
    </div>
  )
}

FilterRow.propTypes = {
  filterCheckbox: PropTypes.object.isRequired, 
  filterCheckboxCount: PropTypes.object.isRequired, 
  // children, can be empty or component
}

export default FilterRow;