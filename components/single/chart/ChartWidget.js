import PropTypes from 'prop-types';

function ChartWidget({ data }){
  if(data.records.length == 0) return <div>No data to generate a chart for this country.</div>
  // check if there is data records
  return "chartWidget"
}

ChartWidget.propTypes = {
  data: PropTypes.object.isRequired,
}

export default ChartWidget;