import { useState } from 'react';
import IconPan from '../../svgSnippets/IconPan';
import PropTypes from 'prop-types';

// MapRegionButton is used to pan the map to region and subregion
// (panning to country is handled in MapWidget itself)

// it gets all countries in region or subregion via props
// on click, it calculates LatLngBounds and sets map to it

function MapRegionButton(props){
  
  // is there region? is there subregion?
  if(!props.label) return null;

  // catch errors and no data
  if(props.countries.error || (!props.countries.isLoading && !props.countries.data)) return null;
  
  // convert data to latlng and feed them into google latlngbounds
  const calculateBounds = () => {

    const bounds = new google.maps.LatLngBounds();
    for(let i = 0; i < props.countries.data.length; i++){
      bounds.extend(new google.maps.LatLng(props.countries.data[i].latlng[0], props.countries.data[i].latlng[1]))
    }
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
      // calculate
      const bounds = calculateBounds();
      // set map to bounds
      props.map.fitBounds(bounds);       // # auto-zoom
      props.map.panToBounds(bounds);     // # auto-center
    }
  }

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