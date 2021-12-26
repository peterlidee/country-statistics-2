import PropTypes from "prop-types";
import Wrapper from "../../general/Wrapper";
import Placeholder from "../../svgSnippets/Placeholder";
import SingleCountryFetch from "../SingleCountryFetch";
import WeatherWidget from "../weather/WeatherWidget";

function SingleCountryWeather(props){

  const placeHolder = <Placeholder extraClass="placeholder__weatherwidget" backgroundColor="#aaa" />;
  
  // first handle the loading, error and data states of the parent component
  if(props.loading || props.error) return(
    <Wrapper base="single-country__component" modifier={"weather"}>
      {placeHolder}
    </Wrapper>
  )
  // no capital, no weather widget
  if(!props.loading && !props.error && !props.capitalName) return( 
    <Wrapper base="single-country__component" modifier={"weather"}></Wrapper>
  )
  
  const endpoint = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURI(props.capitalName)},${props.cca2}&APPID=${process.env.API_KEY_WEATHER}&units=metric`;
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