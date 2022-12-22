import PropTypes from 'prop-types'

function FilterCheckboxCount({ count }){
  return(
    <span className="filtercheckbox__count">
      (<span className="filtercheckbox__count-inner">{count}</span>)
    </span>
  )
}

FilterCheckboxCount.propTypes = {
  count: PropTypes.number.isRequired,
}

export default FilterCheckboxCount