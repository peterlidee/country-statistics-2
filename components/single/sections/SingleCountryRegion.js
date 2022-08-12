import RenderLabelValue from '../region/RenderLabelValue'
import ValidateNeighbouringCountries from '../neighbours/ValidateNeighbouringCountries'

// this components displays 2 boxes: 
// region and neighbours data
// this component feeds validated region, subregion and capital to NeighbouringCountries
// there, they are actually rendered and wrapped

const SingleCountryRegion = (props) => {
  const hasData = props.data ? true : false;
  return(
    <div className="single-country__region">
      <div className="single-country__box">
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
          value={props?.data?.capital && props.data.capital[0] || null} 
          label="capital" 
          hasData={hasData} />
      </div>
      <ValidateNeighbouringCountries 
        loading={props.loading} 
        error={props.error} 
        data={props.data}
      />
    </div>
  )
}

export default SingleCountryRegion;