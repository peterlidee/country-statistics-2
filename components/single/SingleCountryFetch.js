import useFetch from "react-fetch-hook";
import PropTypes from "prop-types";
import Sources from "../sources/Sources";
import Source from "../sources/Source";

function SingleCountryFetch(props){

  const { isLoading, error, data } = useFetch(props.endpoint);
  
  // for gdp and gdpc we make an exception
  // if there are no records in data, 
  // we throw error as to indicate there are no data
  // the request itself however, will be succesfull and throw no error
  let noRecordsError = false
  if(props.type && !isLoading && !error && data && data.records.length == 0){
    noRecordsError = new Error('No data available for this country')
  }

  return(
    <div className={`single-country__${props.extraClass}`}>
      <div className="single-country__box">
        {props.children(isLoading, error, data)}
      </div>
      <Sources extraClass={props.extraClass}> {/* todo remove extraclass from source */}
        <Source 
          error={error || noRecordsError} 
          loading={isLoading} 
          endpoint={props.endpoint}
          label={props.label} />
      </Sources>
    </div>
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