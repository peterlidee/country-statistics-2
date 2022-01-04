import NeighbourComponent from "./NeighbourComponent";
import NeighbouringCountries from "./NeighbouringCountries";

function ValidateNeighbouringCountries(props){

  // we first need to handle the loading, error and data of the parent components fetch
  // if there's loading and no data
  // (if there's loading and data, we just display the previous data)
  if(props.loading && !props.data) return(
    <NeighbourComponent>...</NeighbourComponent>
  )

  // if error
  if(props.error) return(
    <NeighbourComponent>No data found.</NeighbourComponent>
  )

  // no data
  if(!props.loading && !props.error && !props.data.borders) return(
    <NeighbourComponent>No data.</NeighbourComponent>
  )

  // no borders
  if(!props.loading && !props.error && props.data.borders.length == 0) return(
    <NeighbourComponent>None (island).</NeighbourComponent>
  )

  return <NeighbouringCountries borders={props.data.borders} />
}

export default ValidateNeighbouringCountries;