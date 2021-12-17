// import { Chart as ChartJS } from 'chart.js/auto'

// https://www.chartjs.org/docs/latest/getting-started/integration.html
import { 
  Chart as ChartJS,
  CategoryScale, 
  LinearScale,
  BarElement,
  Tooltip,
  // LineController, 
  // LineElement, 
  // PointElement,
  // Title 
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  // LineController, 
  // LineElement, 
  // PointElement, 
  // Title
);

import { Bar } from 'react-chartjs-2';
import colors from '../../../config/colors';
import PropTypes from 'prop-types';
import getChartData from '../../../lib/getChartData';

function ChartWidget(props){

  // console.log('rendering ChartWidget',props)

  
  // check if there is data records
  if(props.data.records.length == 0) return <div>No data to generate a chart for this country.</div>
  
  const { chartLabels, chartValues } = getChartData(props.data.records, props.type)

  const barData = {
    labels: chartLabels,
    datasets: [
      {
        label: props.type,
        data: chartValues,
        backgroundColor: colors.blue,
        hoverBackgroundColor: colors.blue,
        barPercentage: 1.15,
      }
    ]
  }
  const barOptions = {
    responsive: true,
    // legend: {
    //   display: false
    // },
  }

  return(
    <div style={{position: "relative"}}>
      <Bar data={barData} options={barOptions} />
    </div>
  )
}

ChartWidget.propTypes = {
  data: PropTypes.object.isRequired,
  type: PropTypes.string.isRequired,
}

export default ChartWidget;