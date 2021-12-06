import useFetch from "react-fetch-hook";
import PropTypes from 'prop-types';
import Wrapper from "../../general/Wrapper";
import Sources from "../../Sources";

function SingleCountryFetch(props){

  const { isLoading, error, data } = useFetch(props.endpoint);
  //console.log('fetch',isLoading, error, data)

  return(
    <Wrapper base="single-country__component" modifier={props.extraClass}>
      {error && <div>There was a problem with the data.</div>}
      {!error && isLoading && <div>Loading...</div>}
      {!error && !isLoading && !data && <div>There was a problem with the data.</div>}
      {!error && !isLoading && data && props.children(data)}
      <Sources 
        error={error} 
        loading={isLoading} 
        endpoint={props.endpoint}
        label={"Openweather API"}
        extraClass={props.extraClass} />
    </Wrapper>
  )
  //return props.children(isLoading, error, data)
}

export default SingleCountryFetch;