import useFetch from "react-fetch-hook";
import PropTypes from "prop-types";
import Sources from "../sources/Sources";
import Source from "../sources/Source";

function SingleCountryFetch(props){

  const { isLoading, error, data } = useFetch(props.endpoint);

  // for the world bank api, we add an extra error detection
  // because some invalid request will return a valid response
  // https://datahelpdesk.worldbank.org/knowledgebase/articles/898620-api-error-codes
  // also, we want to consider no data an error also

  let extraError = false;

  if(props.type == "population" && data && !isLoading && !error){

    if(Array.isArray(data)){
      // data is an array
      
      // if first item in array has message prop, there is an error
      if(data[0]?.message){ 
        extraError = new Error(data[0].message[0].value)
      }

      // check for empty results (total = 0)
      if(data[0]?.total == 0){
        extraError = new Error("No data for this country.")
      }
      
    }else{
      // data is not an array
      extraError = new Error("No data for this country.");
    }
  }

  return(
    <div className={`single-country__${props.extraClass}`}>
      <div className="single-country__box">
        {props.children(isLoading, error, data)}
      </div>
      <Sources>
        <Source 
          error={error || extraError} 
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