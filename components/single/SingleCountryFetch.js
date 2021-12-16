import useFetch from "react-fetch-hook";
import PropTypes from 'prop-types';
import Wrapper from "../general/Wrapper";
import Sources from "../sources/Sources";
import Source from "../sources/Source";

function SingleCountryFetch(props){

  const { isLoading, error, data } = useFetch(props.endpoint);
  
  // for gdp and gdpc we make an exception
  // if there are no records in data, 
  // don't show anything! no wrapper, source or child component
  let noRecordsError = false
  if(props.type && !isLoading && !error && data && data.records.length == 0){
    noRecordsError = new Error('No data records for this country')
  }

  return(
    <Wrapper base="single-country__component" modifier={props.extraClass}>
      {error && <div>There was a problem with the data.</div>}
      {!error && isLoading && <div>Loading...</div>}
      {!error && !isLoading && !data && <div>There was a problem with the data.</div>}
      {!error && !isLoading && data && props.children(data)}
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