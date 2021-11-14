// generic component
// returns wrap
// <div class="{base} {base}--{modifier}">{props.children}</div>

import PropTypes from 'prop-types';

function Wrapper(props){
  return(
    <div className={`${props.base} ${props.base}--${props.modifier}`}>
      {props.children}
    </div>
  )
}

Wrapper.propTypes = {
  base: PropTypes.string.isRequired,
  modifier: PropTypes.string.isRequired
}

export default Wrapper;