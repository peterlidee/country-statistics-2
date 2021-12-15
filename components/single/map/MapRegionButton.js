import { useState } from 'react';
import IconPan from '../../svgSnippets/IconPan';
import PropTypes from 'prop-types';

// MapRegionButton is used to pan the map to region and subregion
// (panning to country is handled in MapWidget itself)

// it gets all countries in region or subregion via props
// on click, it calculates LatLngBounds from countries and then saves it in state as cache

function MapRegionButton(props){
  
  // is there region? is there subregion?
  if(!props.label) return null;

  // catch errors and no data
  if(props.countries.error || (!props.countries.isLoading && !props.countries.data)) return null;

  // on calulculation, we save the bounds in here
  const [savedBounds, setSavedBounds] = useState(false)
  
  // convert data to latlng and feed them into google latlngbounds
  const calculateBounds = () => {

    const bounds = new google.maps.LatLngBounds();
    for(let i = 0; i < props.countries.data.length; i++){
      bounds.extend(new google.maps.LatLng(props.countries.data[i].latlng[0], props.countries.data[i].latlng[1]))
    }
    // save in state
    setSavedBounds(bounds);
    // return to use
    return bounds;
  }

  // button handler, on click, make the bounds calculations and set map to them
  const setMap = () => {
    // set this button to active
    props.setActive(props.type);

    // we need to set region antarctic manually cause it don't work
    if(props.type == "region" && props.label == "Antarctic"){
      props.map.setCenter(new google.maps.LatLng(-70.83554401282763, 2.3967306184474007))
      props.map.setZoom(2)

    }else if(props.map){
      // get the bounds from state or calculate them
      const bounds = savedBounds ? savedBounds : calculateBounds();
      // set map to bounds
      props.map.fitBounds(bounds);       // # auto-zoom
      props.map.panToBounds(bounds);     // # auto-center
    }
  }

  // const buttonClass = props.active == props.type ? `map-controles__button map-controles__button--active` : `map-controles__button`;
  // return <button onClick={setMap} className={buttonClass} disabled={props.countries.isLoading}>{props.label}</button>;
  return(
    <div className="map-controles__button-container">
      <IconPan active={props.active == props.type} />
      <button onClick={setMap} className="map-controles__button" disabled={props.countries.isLoading}>{props.label}</button>
    </div>
  )
}

MapRegionButton.propTypes = {
  type: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  active: PropTypes.string.isRequired,
  setActive: PropTypes.func.isRequired,
  countries: PropTypes.object.isRequired,
}

export default MapRegionButton;