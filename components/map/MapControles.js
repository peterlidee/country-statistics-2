import PropTypes from 'prop-types';
import { useState } from 'react';
import MapCapitalButton from './MapCapitalButton';
import MapRegionButton from './MapRegionButton';

function MapControles(props){

  const [active, setActive] = useState("country");

  return(
    <div className="map-controls">
      <span className='map-controles__label'>pan to:</span>
      {props.country.capital[0] &&
        <MapCapitalButton 
          capital={props.country.capital[0]} 
          countryName={props.country.name.common}
          subregion={props.country.subregion ? props.country.subregion : props.country.region}
          map={props.map} 
          active={active} 
          setActive={setActive} 
          setGeoCodeLoading={props.setGeoCodeLoading}
          setGeoCodeError={props.setGeoCodeError} />
      }
      <button 
        className={active == 'country' ? "map-controles__button map-controles__button--active" : "map-controles__button"} 
        onClick={() => {
          setActive('country')
          props.setCountryOnMap(props.map)
        }}
      >
        {props.country.name.common}
      </button>
      {props.country.subregion && 
        <MapRegionButton 
          type="subregion" 
          label={props.country.subregion} 
          map={props.map} 
          active={active} 
          setActive={setActive} 
          // setSource={props.setSubregionSource}
          countries={props.subregionCountries} 
          />}

      {props.country.region && 
        <MapRegionButton 
          type="region" 
          label={props.country.region} 
          map={props.map} 
          active={active} 
          setActive={setActive} 
          // setSource={props.setRegionSource}
          countries={props.regionCountries}
          />}
    </div>
  )
}

MapControles.propTypes = {
  country: PropTypes.object.isRequired,
  setCountryOnMap: PropTypes.func.isRequired,
  setGeoCodeLoading: PropTypes.func.isRequired,
  setGeoCodeError: PropTypes.func.isRequired,
  //setRegionSource: PropTypes.func.isRequired,
  //setSubregionSource: PropTypes.func.isRequired,
  regionCountries: PropTypes.object.isRequired,
  subregionCountries: PropTypes.object,
}

export default MapControles;