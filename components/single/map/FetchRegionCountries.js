import useFetch from "react-fetch-hook";
import PropTypes from 'prop-types';

// this function calls useFetch to get all the countries latlng in a (sub)region
// is returns isLoading, error, data and endpoint as function prop

// 1.
// to render MapRegionButton, we need bounds
// however, the <Source> of <MapWidget>, also needs access to endpoint, isLoading and error
// therefore, we use them in SingleCountryMap, the parent of <MapWidget>

// 2.
// also, not all countries have a subregion, so we have to call the useFetch hook conditionally
// if there is a subregion, make a fetch
// you can run functions conditionally but not hooks,
// so we created this function just for that

function FetchRegionCountries(props){
  const endpoint = `https://restcountries.com/v3.1/${props.type}/${encodeURIComponent(props.label)}?fields=latlng`;
  const { isLoading, error, data } = useFetch(endpoint);
  return props.children({ isLoading, error, data, endpoint })
}

FetchRegionCountries.propTypes = {
  type: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
}

export default FetchRegionCountries;