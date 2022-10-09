import Proptypes from 'prop-types';
import { roundNumber } from '../../../lib/helpers'
import formatNumber from '../../../lib/helpers/formatNumber'
import BoxWrapper from '../../general/BoxWrapper'

function SingleCountryBasisStats(props){

  const population = formatNumber(roundNumber(props.population));
  const area = formatNumber(roundNumber(props.area));
  const density = formatNumber(roundNumber(Math.round( props.population / props.area )));

  return(
    <BoxWrapper name="basic-stats">
      <div className="single-country__label">Total population</div>
      <div className="single-country__value">{population}</div>
      <div className="single-country__label">Size</div>
      <div className="single-country__value">{area} km²</div>
      {props.area > 0 && props.population > 0 && 
        <>
          <div className="single-country__label">Population density</div>
          <div className="single-country__value">{density} inhabitants / km²</div>
        </>
      }
    </BoxWrapper>
  )
}

SingleCountryBasisStats.propTypes = {
  population: Proptypes.number.isRequired,
  area: Proptypes.number.isRequired,
}

export default SingleCountryBasisStats;