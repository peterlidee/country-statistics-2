import useFetch from "react-fetch-hook";
import PropTypes from "prop-types";
import Wrapper from "../general/Wrapper";
import Sources from "../sources/Sources";
import Source from "../sources/Source";

function SingleCountryFetch(props){

  const { isLoading, error, data } = useFetch(props.endpoint);
  
  // for gdp and gdpc we make an exception
  // if there are no records in data, 
  // don't show anything! no wrapper, source or child component
  // TODO: not needed????
  let noRecordsError = false
  if(props.type && !isLoading && !error && data && data.records.length == 0){
    noRecordsError = new Error('No data available for this country')
  }

  return(
    <Wrapper base="single-country__component" modifier={props.extraClass}>
      {props.children(isLoading, error, data)}
      <Sources extraClass={props.extraClass}>
        <Source 
          error={error || noRecordsError} 
          loading={isLoading} 
          endpoint={props.endpoint}
          label={props.label} />
      </Sources>
    </Wrapper>
  )
}

SingleCountryFetch.propTypes = {
  endpoint: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
}

SingleCountryFetch.defaultProps = {
  extraClass: "",
  type: false,
}

export default SingleCountryFetch;