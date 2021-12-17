import PropTypes from 'prop-types';
import SingleCountryFetch from '../SingleCountryFetch';
import ChartWidget from '../chart/ChartWidget';

function SingleCountryChart(props){

  // some data to construct api endpoints (gdp and gdppc)
  // working examples
  // https://data.opendatasoft.com/api/records/1.0/search/?dataset=gdp-from-1960-to-2017%40euler-hermes&rows=100&sort=year&refine.country_code=BEL
  // https://data.opendatasoft.com/api/records/1.0/search/?dataset=gdp-1960-2017%40euler-hermes&rows=100&sort=year&refine.country_code=BEL

  const endpointBase = 'https://data.opendatasoft.com/api/records/1.0/search/';
  const dataset = {
    "gdp": 'gdp-from-1960-to-2017@euler-hermes',
    "gdpc": 'gdp-1960-2017@euler-hermes',
  }
  
  const endpoint = `${endpointBase}?dataset=${dataset[props.type]}&sort=year&rows=100&refine.country_code=${props.countryCode.toUpperCase()}`;

  return(
    <SingleCountryFetch
      endpoint={endpoint}
      label={`opendatasoft.com (${dataset[props.type]})`}
      extraClass={props.type}
      showSource={true}
      type={props.type}
    >
      {(data) => <ChartWidget data={data} type={props.type} />}
    </SingleCountryFetch>
  )
}

SingleCountryChart.propTypes = {
  countryCode: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired
}

export default SingleCountryChart;