import PropTypes from "prop-types";
import Wrapper from "../../general/Wrapper";

function SingleCountryStatus(props){
  const noData = <div className="error-message" style={{"marginBottom": "1em"}}>No data found for {props.countryCode}</div>;
  return(
    <Wrapper base="single-country__component" modifier="status">
      {props.error && noData}
      {!props.loading && !props.error && !props.data && noData}
      {props.children}
    </Wrapper>
  )
}

SingleCountryStatus.propTypes = {
  countryCode: PropTypes.string.isRequired,
}

export default SingleCountryStatus;