import PropTypes from "prop-types";
import Placeholder from "../../svgSnippets/Placeholder";
import BoxWrapper from '../../general/BoxWrapper';
import SingleCountryFetch from "../SingleCountryFetch";
import WeatherWidget from "../weather/WeatherWidget";


function SingleCountryWeather(props){
  
  // first handle the loading, error and data states of the parent component
  // no longer usefull with SSG but leaving it in for now
  if((props.loading && !props.capitalName) || props.error) return(
    <BoxWrapper name="placeholder">
      <Placeholder />
    </BoxWrapper>
  )
  // no capital, no weather widget
  if(!props.loading && !props.error && !props.capitalName) return( 
    <div className="single-country__weather"></div>
  )
  
  const endpoint = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURI(props.capitalName)},${props.cca2}&APPID=${process.env.NEXT_PUBLIC_API_KEY_WEATHER}&units=metric`;
  const label = 'Openweather API';

  return(
    <SingleCountryFetch 
      endpoint={endpoint}
      extraClass="weather"
      label={label}
      showSource={true}
    >
      {(isLoading, error, data) => <WeatherWidget loading={isLoading} error={error} data={data} countryCode={props.countryCode} />}
    </SingleCountryFetch>
  )
}

SingleCountryWeather.propTypes = {
  countryCode: PropTypes.string.isRequired,
}

export default SingleCountryWeather;