import PropTypes from 'prop-types';
import { useState } from 'react';

function Collapse(props){
  const [open, setOpen] = useState(false);
  const displayStyle = { 'display': open ? 'block': 'none' }
  return(
    <div className="collapse">
      <button className="collapse__controller" onClick={() => setOpen(!open)}>
        <span className="collapse__status">{open ? "-" : "+"}</span>
        <span className="collapse__label">{props.label}</span>
      </button>
      <div className="collapse__content" style={displayStyle}>
        {props.children}
      </div>
    </div>
  )  
}

Collapse.propType = {
  label: PropTypes.string.isRequired,
}

export default Collapse;