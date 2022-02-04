import PropTypes from 'prop-types';

function FilterCheckBox(props){
  return(
    <>
      <label className="filtercheckbox__label">
        <input type="checkbox" className="filtercheckbox__input" value={""} checked={props.active} onChange={props.handler} />
        {props.label}
      </label>
    </>
  )
}

FilterCheckBox.propTypes = {
  active: PropTypes.bool.isRequired,
  label: PropTypes.string.isRequired,
  handler: PropTypes.func.isRequired,
}

export default FilterCheckBox;