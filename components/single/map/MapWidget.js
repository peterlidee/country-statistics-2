import React, { useState, useCallback } from 'react';
import { GoogleMap, useJsApiLoader } from '@react-google-maps/api';
import MapControles from './MapControles';
import Sources from '../../sources/Sources';
import Source from '../../sources/Source';
import PropTypes from 'prop-types';

// MapWidget loads google map and sets it up
// it also handles pan buttons and sources

const containerStyle = {
  width: '100%',
  height: '500px',
  borderRadius: '3px',
};

function MapWidget(props){
  
  // connect to google maps
  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: process.env.API_KEY_GOOGLE,
    language: "en",
  })

  // an instance of the GoogleMap is saved in here
  // that way, we can use it in map buttons that pan to f.e. region
  const [mapInState, setMapInState] = useState(null);

  // onLoad function saves map instance in state and sets map to current country bounds
  const onLoad = useCallback(function callback(map){
    setMapInState(map)
    setCountryOnMap(map)
  });

  const onUnmount = useCallback(function callback(map) {
    console.log('Am I being unmounted???',)
  }, []);

  const setMap = (map, bounds) => {
    map.fitBounds(bounds);       // # auto-zoom
    map.panToBounds(bounds);     // # auto-center
  }

  // this function sets the map to country borders
  // it first checks to see if the countryBounds were already calculated
  // use those if yes, else calculate them if they don't exist yet
  const setCountryOnMap = (map) => {

    setGeoCodeLoading(true);

    // check if countryBounds were saved in state first
    if(countryBounds){

      // set map to bounds
      setMap(map, countryBounds);
      // set error and loading
      setGeoCodeError(null);
      setGeoCodeLoading(false);

    }else{
      // calculate the bounds and set map to auto zoom and center or handle error
      const geoCoder = new window.google.maps.Geocoder();
      geoCoder.geocode(
        { 'address': props.country.name.common, 'region': props.country.tld[0].replace('.','') },
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

            // set error State (back) to null
            setCountryBounds(bounds);
            // set error and loading
            setGeoCodeError(null);
            setGeoCodeLoading(false);

          }else{ // handle error
            // clear out state just in case
            setCountryBounds(false);
            // set error and loading
            setGeoCodeError(new Error(`No data found: ${status}`));
            setGeoCodeLoading(false);
          }
      })
    }
  }

  // these are used by setCountryMap to store the calculated bounds of the current country
  const [countryBounds, setCountryBounds] = useState(false);

  // for panButtons
  // we make 2 geocode request, for country and capital
  // their loading and error states are captured here
  const [geoCodeLoading, setGeoCodeLoading] = useState(true);
  const [geoCodeError, setGeoCodeError] = useState(null);

  return(
    <>
      { isLoaded ? 
        <>
          <MapControles 
            country={props.country} 
            map={mapInState} 
            setCountryOnMap={setCountryOnMap}
            setGeoCodeLoading={setGeoCodeLoading}
            setGeoCodeError={setGeoCodeError}
            regionCountries={props.regionCountries}
            subregionCountries={props.subregionCountries} />
          <GoogleMap
            mapContainerStyle={containerStyle}
            onLoad={onLoad}
            onUnmount={onUnmount}/>
        </> : <div>Loading...</div>}
      <Sources extraClass="map">
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
    </>
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