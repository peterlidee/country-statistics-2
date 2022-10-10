// a source can have 3 states: error, loading and loaded
// a source can have a link or just a label
// if there's an error, there will also be an error message

import PropTypes from 'prop-types';

function Source(props){
  const status = (props.loading) ? 'loading' : props.error ? 'error' : 'loaded';
  return(
    <div className="source">
      <div className={`source__icon source__icon--${status}`}></div>
      <div className="source__status">{status}</div>
      <div>
        {!props.endpoint && <span className="source__nolink">{props.label}</span>}
        {props.endpoint && <a className="source__link" href={props.endpoint} target="_blank" rel="noreferrer">{props.label}</a>}
        {props.error && props.error.message && <div className="source__errormessage">{`[${props.error.message}]`}</div>}
      </div>
    </div>
  )
}

Source.propTypes = {
  loading: PropTypes.bool.isRequired,
  label: PropTypes.string.isRequired,  
}
Source.defaultProps = {
  error: undefined,
}

export default Source;