import PropTypes from "prop-types";
import SingleCountryFetch from "../SingleCountryFetch";
import WeatherWidget from "./WeatherWidget";

function SingleCountryWeather(props){

  const endpoint = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURI(props.capitalName)},${props.cca2}&APPID=${process.env.API_KEY_WEATHER}&units=metric`;
  const label = 'Openweather API';

  return(
    <SingleCountryFetch 
      endpoint={endpoint}
      extraClass="weather"
      label={label}
      showSource={true}
    >
      {(data) => <WeatherWidget data={data} />}
    </SingleCountryFetch>
  )
}

SingleCountryWeather.propTypes = {
  capitalName: PropTypes.string.isRequired,
  cca2: PropTypes.string.isRequired,
}

export default SingleCountryWeather;