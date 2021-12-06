import IconWindDirection from '../../svgSnippets/IconWindDirection';
import IconWeather from '../../svgSnippets/IconWeather';

import PropTypes from 'prop-types';

const WeatherWidget = ({ data }) => {

  const codes = {
    '01': 'clear',
    '02': 'few',
    '03': 'scat',
    '04': 'broken',
    '09': 'shower',
    '10': 'rain',
    '11': 'thunder',
    '13': 'snow',
    '50': 'mist'
  }

  const code = data.weather[0].icon;
  const dayNight = code[2] == 'd' ? 'day' : 'night';
  const weather = codes[code.slice(0,2)];

  return(
    <div className={`weather__container ${dayNight}`}>
      <div className={`weather ${weather}`}>

        <div className="weather__description">weather in {data.name}</div>

        <div className="weather__component weather__component--temperature">
          <div className="weather__component__header">temp</div>
          <div className="weather__component__body">
            <div className="weather__temp--max">{Math.ceil(data.main.temp_max)}</div>
            <div className="weather__temp--min">{Math.floor(data.main.temp_min)}</div>
          </div>
          <div className="weather__component__footer">°C</div>
        </div>

        <div className="weather__component weather__component--state">
          <IconWeather type={weather} />
        </div>

        <div className="weather__component weather__component--wind">
          <div className="weather__component__header">wind</div>
          <div className="weather__component__body">
            <div className="weather__wind__direction">
              <IconWindDirection deg={data.wind.deg} speed={123} />
            </div>
            <div className="weather__windspeed">{Math.round(data.wind.speed * 3.6)}</div>
          </div>
          <div className="weather__component__footer">km/h</div>
        </div>

        <div className="weather__description">{data.weather[0].description}</div>

      </div>
    </div>
  )
}

WeatherWidget.propTypes = {
  data: PropTypes.object.isRequired,
}

export default WeatherWidget;