// we need a more complex loading, error and data handling
// because some value props to RenderLabelValue will be undefined
// not because of loading or error but because there simply is no value
// f.e. a country with no subregion or capital

const RenderLabelValue = (props) => {
  let value = "";
  if(!props.hasData){ // there is no data
    // loading or !data, !loading = error
    value = props.loading ? "..." : "No data";
  }else{ // there is data
    // if no value yet there is data = none
    value = props.value ? props.value : "None"
  }

  return(
    <>
      <div className="single-country__label">{props.label}</div>
      <div className="single-country__value">
        {value}
      </div>
    </>
  )
}

export default RenderLabelValue