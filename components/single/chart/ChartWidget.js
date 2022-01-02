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
import formatGDP from '../../../lib/formatGDP';
import PropTypes from 'prop-types';

function ChartWidget(props){

  const barData = {
    labels: props.chartLabels,
    datasets: [
      {
        label: props.type,
        data: props.chartValues,
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
    <>
      <h4 className="chart__title">{`Gross Domestic Product ${props.type == "gdpc" ? "per capita" : ""} - USD`}</h4>
      <Bar data={barData} options={barOptions} />
    </>
  )
}

ChartWidget.propTypes = {
  chartLabels: PropTypes.array.isRequired,
  chartValues: PropTypes.array.isRequired,
  type: PropTypes.string.isRequired,
}
export default ChartWidget;