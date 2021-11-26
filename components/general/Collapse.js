import PropTypes from 'prop-types';
import { useState } from 'react';
import Wrapper from '../general/Wrapper';

function Collapse(props){
  const [open, setOpen] = useState(false);
  const displayStyle = { 'display': open ? 'block': 'none' }
  return(
    <Wrapper base="collapse" modifier={props.extraClass}>
      <button className="collapse__controller" onClick={() => setOpen(!open)}>
        <span className="collapse__status">{open ? "-" : "+"}</span>
        <span className="collapse__label">{props.label}</span>
      </button>
      <div className="collapse__content" style={displayStyle}>
        {props.children}
      </div>
    </Wrapper>
  )  
}

Collapse.propType = {
  label: PropTypes.string.isRequired,
}
Collapse.defaultTypes = {
  extraClass: "",
}

export default Collapse;