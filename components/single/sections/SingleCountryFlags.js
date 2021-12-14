import PropTypes from 'prop-types';
import { useState } from 'react';
import Wrapper from '../../general/Wrapper';

function SingleCountryFlags(props){
  const [active, setActive] = useState('flag');
  return(
    <Wrapper base="single-country__component" modifier="flags">
      {active == "flag" && 
        <img src={props.flag} alt={`flag of ${props.countryName}`} className="single-country__flag" />}
      {active == "coatOfArms" && 
          <img src={props.coatOfArms} alt={`coat of arms of  ${props.countryName}`} className="single-country__coatOfArms" />}
      {props.coatOfArms && 
        <div className="flags__controles">
          <button 
            className={`flags__controle ${active == 'flag' ? "flags__controle--active" : ""}`} 
            onClick={() => setActive('flag')}>
              flag
          </button>
          <button 
            className={`flags__controle ${active == 'coatOfArms' ? "flags__controle--active" : ""}`}  
            onClick={() => setActive('coatOfArms')}>
              coat of arms
          </button>
        </div>
      }
    </Wrapper>
  )
}

SingleCountryFlags.propTypes = {
  countryName: PropTypes.string.isRequired,
  flag: PropTypes.string.isRequired,
}

export default SingleCountryFlags;