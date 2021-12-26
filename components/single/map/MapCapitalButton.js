import IconPan from '../../svgSnippets/IconPan';
import PropTypes from 'prop-types';

// the function renders a button that centers the map on the current country's capital
// it makes a geocode request to get the capital bounds and saves it to state
// if the bounds are in state, no request is made

function MapCapitalButton(props){

  const setMap = (bounds) => {
    // set map to bounds
    props.map.fitBounds(bounds);       // # auto-zoom
    props.map.panToBounds(bounds);     // # auto-center
  }

  const handleButton = () => {

    // set loading true
    props.setGeoCodeLoading(true);

    // calculate the bounds
    const geoCoder = new window.google.maps.Geocoder();
    geoCoder.geocode({ 'address': `${props.capital} ${props.countryName}`, 'region': props.subregion },function(results, status){

      if( status == "OK"){ // we have a result

        const bounds = new google.maps.LatLngBounds();
        const viewport = results[0].geometry.viewport;
        const ne = new google.maps.LatLng(viewport.getNorthEast().lat(), viewport.getNorthEast().lng());
        const sw = new google.maps.LatLng(viewport.getSouthWest().lat(), viewport.getSouthWest().lng());
        bounds.extend(ne);
        bounds.extend(sw);
        
        // set map to bounds
        setMap(bounds)
        // set current active class
        props.setActive("capital");
        // set loading and error
        props.setGeoCodeLoading(false);
        props.setGeoCodeError(null);

      }else{ // handle error
        // set error and loading
        props.setGeoCodeError(new Error(`No data found: ${status}`));
        props.setGeoCodeLoading(false);
      }
    });
  }

  return(
    <div className="map-controles__button-container">
      <IconPan active={props.active == "capital"} />
      <button onClick={handleButton} className="map-controles__button">{props.capital}</button>
    </div>
  )
}

MapCapitalButton.propTypes = {
  capital: PropTypes.string.isRequired,
  countryName: PropTypes.string.isRequired,
  subregion: PropTypes.string.isRequired,
  active: PropTypes.string.isRequired,
  setActive: PropTypes.func.isRequired,
}

export default MapCapitalButton;