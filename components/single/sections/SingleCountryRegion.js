import Wrapper from '../../general/Wrapper';
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

const SingleCountryRegion = (props) => {
  const hasData = props.data ? true : false;
  return(
    <Wrapper base="single-country__component" modifier="region">
      <div className="single-country__inner-mobile-container">
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
        <NeighbouringCountries 
          loading={props.loading} 
          error={props.error} 
          data={props.data} />
      </div>
    </Wrapper>
  )
}

export default SingleCountryRegion;