// this function gets raw data from datasoft endpoint and returns 2 arrays:
// one with the years 0 -> 100
// one with the gdp or gdpc data

export default function getChartData(arr, type){

  const key = {
    "gdp": "gdp_current_us",
    "gdpc": "gdp_per_capita_current_us",
  }
  const chartLabels = [];
  const chartValues = [];

  // get reverse chronological order
  for(let i = arr.length - 1; i >= 0; i--){
    chartLabels.push(arr[i].fields.year)
    chartValues.push(Math.round(arr[i].fields[key[type]]))
  }

  return {chartLabels, chartValues}
}

