import Proptypes from 'prop-types';
import Wrapper from '../../general/Wrapper';
import NeighbouringCountries from './NeighbouringCountries';


function SingleCountryRegion(props){

  return(
    <Wrapper base="single-country__component" modifier="region">
      {props.data.region && 
        <>
          <div className="single-country__label">region</div>
          <div className="single-country__value">{props.data.region}</div>
        </>
      }
      {props.data.subregion && 
        <>
          <div className="single-country__label">subregion</div>
          <div className="single-country__value">{props.data.subregion}</div>
        </>
      }
      {props.data.capital && 
        <>
          <div className="single-country__label">capital</div>
          <div className="single-country__value">{props.data.capital}</div>
        </>
      }
      <NeighbouringCountries borders={props.data.borders}>
        {props.children}
      </NeighbouringCountries>
    </Wrapper>
  )
}

SingleCountryRegion.propTypes = {
  data: Proptypes.object.isRequired,
}

export default SingleCountryRegion;