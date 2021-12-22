import Wrapper from '../../general/Wrapper';
import NeighbouringCountries from '../neighbours/NeighbouringCountries';

const RenderLabelValue = (props) => (
  <>
    <div className="single-country__label">{props.label}</div>
    <div className="single-country__value">
      {props.loading && "..."}
      {!props.loading && props.error && "No data"}
      {!props.loading && !props.error && !props.value && "None"}
      {!props.loading && !props.error && props.value}
    </div>
  </>
)

const SingleCountryRegion = (props) => (
  <Wrapper base="single-country__component" modifier="region">
    <RenderLabelValue loading={props.loading} error={props.error} value={props.data?.region} label="region" />
    <RenderLabelValue loading={props.loading} error={props.error} value={props.data?.subregion} label="subregion" />
    <RenderLabelValue loading={props.loading} error={props.error} value={props.data?.capital[0]} label="capital" />
    <NeighbouringCountries 
      loading={props.loading} 
      error={props.error} 
      borders={props?.data?.borders}
      source={props.source} 
    />
  </Wrapper>
)

export default SingleCountryRegion;