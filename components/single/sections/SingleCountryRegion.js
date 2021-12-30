import NeighbouringCountries from '../neighbours/NeighbouringCountries';

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

// this component feeds validated region, subregion and capital to NeighbouringCountries
// there, they are actually rendered and wrapped

const SingleCountryRegion = (props) => {
  const hasData = props.data ? true : false;
  return(
    <NeighbouringCountries 
      loading={props.loading} 
      error={props.error} 
      data={props.data}
    >
      <RenderLabelValue 
        loading={props.loading} 
        hasData={hasData} 
        value={props.data?.region} 
        label="region" />
      <RenderLabelValue 
        loading={props.loading} 
        value={props.data?.subregion} 
        label="subregion" 
        hasData={hasData} />
      <RenderLabelValue 
        loading={props.loading} 
        value={props.data?.capital[0]} 
        label="capital" 
        hasData={hasData} />
    </NeighbouringCountries>
  )
}

export default SingleCountryRegion;