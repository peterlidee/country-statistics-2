import PropTypes from 'prop-types';

function Collapse(props){
  return(
    <div className="collapse">
      <button className="collapse__controller">
        <span className="collapse__status">{props.open ? "+" : "-"}</span>
        <span className="collapse__label">{props.label}</span>
      </button>
      {props.open && (
        <div className="collapse__content">
          {props.children}
        </div>
      )}
    </div>
  )  
}

Collapse.propType = {
  label: PropTypes.string.isRequired,
  open: PropTypes.bool.isRequired,
  handler: PropTypes.func.isRequired,
}

export default Collapse;