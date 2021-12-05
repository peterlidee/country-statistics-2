import Proptypes from 'prop-types';
import { formatNumber, roundNumber } from "../../../lib/helpers";

function SingleCountryBasisStats(props){

  const data = props.data;
  const population = formatNumber(roundNumber(data.population));
  const area = formatNumber(roundNumber(data.area));
  const density = formatNumber(roundNumber(Math.round( data.population / data.area )));

  return(
    <div className="single-country__component single-country__component--basis-stats">
      <div className="single-country__label">Total population</div>
      <div className="single-country__value">{population}</div>
      <div className="single-country__label">Size</div>
      <div className="single-country__value">{area} km²</div>
      {data.area > 0 && data.population > 0 && 
        <>
          <div className="single-country__label">Population density</div>
          <div className="single-country__value">{density} inhabitants / km²</div>
        </>
      }
      {props.children}
    </div>
  )
}

SingleCountryBasisStats.propTypes = {
  data: Proptypes.object.isRequired,
}

export default SingleCountryBasisStats;