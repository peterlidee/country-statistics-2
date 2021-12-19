// https://www.chartjs.org/docs/latest/getting-started/integration.html
import { 
  Chart as ChartJS,
  CategoryScale, 
  LinearScale,
  BarElement,
  Tooltip,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
);

import { Bar } from 'react-chartjs-2';
import colors from '../../../config/colors';
import getChartData from '../../../lib/getChartData';
import formatGDP from '../../../lib/formatGDP';
import PropTypes from 'prop-types';

function ChartWidget(props){
  
  // check if there is data records
  if(props.data.records.length == 0) return <div>No data to generate a chart for this country.</div>
  
  // get data arrays from props.data
  const { chartLabels, chartValues } = getChartData(props.data.records, props.type);

  const barData = {
    labels: chartLabels,
    datasets: [
      {
        label: props.type,
        data: chartValues,
        backgroundColor: colors.blue,
        hoverBackgroundColor: colors.blue,
        barPercentage: 1.15, // make them wider
      }
    ]
  }
  const barOptions = {
    responsive: true, // default
    maintainAspectRatio: true, // default
    scales: {
      x: {
        grid: {
          display: false,
        },
      },
      y: {
        ticks: {
          callback: function(value, index, values) {
            return props.type == "gdp" ? formatGDP(value) : value;
          }
        }
      }
    },
    legend: {
      display: false
    },
  }

  return(
    <div>
      <h4 className="chart__title">{`Gross Domestic Product ${props.type == "gdpc" ? "per capita" : ""} in USD: evolution`}</h4>
      <Bar data={barData} options={barOptions} />
    </div>
  )
}

ChartWidget.propTypes = {
  data: PropTypes.object.isRequired,
  type: PropTypes.string.isRequired,
}
export default ChartWidget;