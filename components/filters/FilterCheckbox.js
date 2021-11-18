import PropTypes from 'prop-types';

function FilterCheckBox(props){
  return(
    <>
      <input type="checkbox" value={""} checked={props.active} id={`filter-checkbox-${props.label}`} onChange={props.handler} />
      <label htmlFor={`filter-checkbox-${props.label}`}>{props.label}</label>
    </>
  )
}

FilterCheckBox.propTypes = {
  active: PropTypes.bool.isRequired,
  label: PropTypes.string.isRequired,
  handler: PropTypes.func.isRequired,
}

export default FilterCheckBox;