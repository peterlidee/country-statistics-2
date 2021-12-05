import PropTypes from 'prop-types';

// a source can have 3 states: error, loading and loaded
// a source can have a link or just a label
// if there's an error, there will also be an error message

function Sources(props){
  const status = (props.loading) ? 'loading' : props.error ? 'error' : 'loaded';
  const containerClass = props.extraClass ? `source__container source__container--${props.extraClass}` : "source__container";
  return(
    <div className={containerClass}>
      <h4 className="source__title">source</h4>
      <div className="source">
        <div className={`source__icon source__icon--${status}`}></div>
        <div className="source__status">{status}</div>
        <div>
          {!props.endpoint && <span className="source__nolink">{props.label}</span>}
          {props.endpoint && <a className="source__link" href={props.endpoint} target="_blank">{props.label}</a>}
          {props.error && props.error.message && <div className="source__errormessage">[{props.error.message}]</div>}
        </div>
      </div>
    </div>
  )
}

Sources.propTypes = {
  loading: PropTypes.bool.isRequired,
  label: PropTypes.string.isRequired,  
}

Sources.defaultProps = {
  error: undefined,
  extraClass: '',
}

export default Sources;