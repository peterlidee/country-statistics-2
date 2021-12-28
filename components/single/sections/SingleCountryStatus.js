import PropTypes from "prop-types";

function SingleCountryStatus(props){
  const noData = <div className="error-message" style={{"marginBottom": "1em"}}>No data found for {props.countryCode}</div>;
  return(
    <div className="single-country__status">
      {props.error && noData}
      {!props.loading && !props.error && !props.data && noData}
      {props.children}
    </div>
  )
}

SingleCountryStatus.propTypes = {
  countryCode: PropTypes.string.isRequired,
}

export default SingleCountryStatus;