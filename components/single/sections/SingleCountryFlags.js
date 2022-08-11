/* eslint-disable @next/next/no-img-element */
import PropTypes from 'prop-types';
import { useState } from 'react';
import BoxWrapper from '../../general/BoxWrapper';
import Placeholder from '../../svgSnippets/Placeholder';

function SingleCountryFlags(props){
  const [active, setActive] = useState('flag');

  if(!props.flag && !props.coatOfArms){
    return(
      <BoxWrapper name="placeholder">
        <Placeholder />
      </BoxWrapper>
    )
  }
  
  return(
    <BoxWrapper name="flags">
      {active == "flag" && 
        <img src={props.flag} alt={`flag of ${props.countryName}`} className="single-country__flag" />}
      {active == "coatOfArms" && props.coatOfArms &&
        <img src={props.coatOfArms} alt={`coat of arms of ${props.countryName}`} className="single-country__coatOfArms" />}
      {active == "coatOfArms" && !props.coatOfArms &&
        // if cOA is active but there is no coa, show the flag instead
        <img src={props.flag} alt={`flag of ${props.countryName}`} className="single-country__flag" />}
    
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
    </BoxWrapper>
  )
}

SingleCountryFlags.propTypes = {
  countryName: PropTypes.string.isRequired,
}

export default SingleCountryFlags;