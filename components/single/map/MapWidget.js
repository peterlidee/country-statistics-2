import React, { useState, useCallback } from 'react';
import { GoogleMap, useJsApiLoader } from '@react-google-maps/api';
import MapControles from './MapControles';
import Sources from '../../sources/Sources';
import Source from '../../sources/Source';
import PropTypes from 'prop-types';
import Placeholder from '../../svgSnippets/Placeholder';

// MapWidget loads google map and sets it up
// it also handles pan buttons and sources

const containerStyle = {
  width: '100%',
  height: '450px',
};

function MapWidget(props){
  
  // connect to google maps
  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: process.env.NEXT_PUBLIC_API_KEY_GOOGLE,
    language: "en",
  })

  // an instance of the GoogleMap is saved in here
  // that way, we can use it in map buttons that pan to f.e. region
  const [mapInState, setMapInState] = useState(null);

  // onLoad function saves map instance in state and sets map to current country bounds
  const onLoad = useCallback(function callback(map){
    setMapInState(map)
    setCountryOnMap(map)
  }, []);

  // const onUnmount = useCallback(function callback(map) {
  //   console.log('Am I being unmounted???',)
  // }, []);

  const setMap = (map, bounds) => {
    map.fitBounds(bounds);       // # auto-zoom
    map.panToBounds(bounds);     // # auto-center
  }

  // this function calculates the countries boundaries and sets the map to them
  const setCountryOnMap = (map) => {

    setGeoCodeLoading(true);

    // calculate the bounds and set map to auto zoom and center or handle error
    const geoCoder = new window.google.maps.Geocoder();

    // check if there is a tld
    const tld = props.country.tld.length > 0 ? props.country.tld[0].replace('.','') : props.country.region ? props.country.region : "";

    geoCoder.geocode(
      { 'address': props.country.name.common, 'region': tld },
      function(results, status){

        if( status == "OK"){ // we have a result

          const bounds = new google.maps.LatLngBounds();
          const viewport = results[0].geometry.viewport;
          const ne = new google.maps.LatLng(viewport.getNorthEast().lat(), viewport.getNorthEast().lng());
          const sw = new google.maps.LatLng(viewport.getSouthWest().lat(), viewport.getSouthWest().lng());
          bounds.extend(ne);
          bounds.extend(sw);
          
          // set map to bounds
          setMap(map, bounds);
          // set error and loading
          setGeoCodeError(null);
          setGeoCodeLoading(false);

        }else{ // handle error
          // set error and loading
          setGeoCodeError(new Error(`No data found: ${status}`));
          setGeoCodeLoading(false);
        }
      }
    )
  }

  // for panButtons
  // we make 2 geocode request, for country and capital
  // their loading and error states are captured here
  const [geoCodeLoading, setGeoCodeLoading] = useState(true);
  const [geoCodeError, setGeoCodeError] = useState(null);

  return(
    <div className="single-country__map">
      { isLoaded ? 
        <div className="single-country__box">
          <GoogleMap
            mapContainerStyle={containerStyle}
            onLoad={onLoad}
            //onUnmount={onUnmount}
            />
          <MapControles 
            country={props.country} 
            map={mapInState} 
            setCountryOnMap={setCountryOnMap}
            setGeoCodeLoading={setGeoCodeLoading}
            setGeoCodeError={setGeoCodeError}
            regionCountries={props.regionCountries}
            subregionCountries={props.subregionCountries} />
        </div> : <Placeholder />}
      <Sources>
        <Source label="Google Maps API" loading={!isLoaded} error={loadError} />
        <Source label="Google GeoCode API" loading={geoCodeLoading} error={geoCodeError} />
        <Source 
          label="restcountries.com/{region}" 
          endpoint={props.regionCountries.endpoint} 
          loading={props.regionCountries.isLoading} 
          error={props.regionCountries.error} />
        {props.country.subregion && 
          <Source 
            label="restcountries.com/{subregion}" 
            endpoint={props.subregionCountries.endpoint} 
            loading={props.subregionCountries.isLoading} 
            error={props.subregionCountries.error} />}
      </Sources>
    </div>
  )
}

MapWidget.propTypes = {
  country: PropTypes.object.isRequired,
  regionCountries: PropTypes.object.isRequired,
  subregionCountries: PropTypes.object,
}

MapWidget.defaultProps = {
  subregionCountries: {}
}

export default React.memo(MapWidget)