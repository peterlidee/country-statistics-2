import React from 'react';
import PropTypes from 'prop-types';
import { useState } from 'react';
import MapCapitalButton from './MapCapitalButton';
import MapRegionButton from './MapRegionButton';
import IconPan from '../../svgSnippets/IconPan';

// we use class component and not a functional comp because we need componentDidUpdate

class MapControles extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      active: 'country'
    }
    this.setActive = this.setActive.bind(this);
  }

  setActive(type){
    this.setState({
      active: type
    })
  }

  componentDidUpdate(prevProps){
    // when the component updates (state or props)
    // we want to check if the country changed
    // if so, we need to reset the map to fit new country
    // it basically works the same as pushing the country pan button
    if(prevProps.country.cca2 !== this.props.country.cca2){
      // reset state to country
      this.setState({
        active: "country"
      })
      // pan map to country bounds
      this.props.setCountryOnMap(this.props.map)
    }
  }

  render(){
    return(
      <div className="map-controles">
        <span className='map-controles__label'>pan to</span>
        {this.props.country.capital[0] &&
          <MapCapitalButton 
            capital={this.props.country.capital[0]} 
            countryName={this.props.country.name.common}
            subregion={this.props.country.subregion ? this.props.country.subregion : this.props.country.region}
            map={this.props.map} 
            active={this.state.active} 
            setActive={this.setActive} 
            setGeoCodeLoading={this.props.setGeoCodeLoading}
            setGeoCodeError={this.props.setGeoCodeError} />
        }
        <div className="map-controles__button-container">
          <IconPan active={this.state.active == 'country'} />
          <button 
            className="map-controles__button"
            onClick={() => {
              this.setActive('country')
              this.props.setCountryOnMap(this.props.map)
            }}
          >
            {this.props.country.name.common}
          </button>
        </div>
        {this.props.country.subregion && 
          <MapRegionButton 
            type="subregion" 
            label={this.props.country.subregion} 
            map={this.props.map} 
            active={this.state.active} 
            setActive={this.setActive} 
            countries={this.props.subregionCountries} />
        }
        {this.props.country.region && 
          <MapRegionButton 
            type="region" 
            label={this.props.country.region} 
            map={this.props.map} 
            active={this.state.active} 
            setActive={this.setActive} 
            countries={this.props.regionCountries} />
        }
      </div>
    )
  }
}

MapControles.propTypes = {
  country: PropTypes.object.isRequired,
  setCountryOnMap: PropTypes.func.isRequired,
  setGeoCodeLoading: PropTypes.func.isRequired,
  setGeoCodeError: PropTypes.func.isRequired,
  regionCountries: PropTypes.object.isRequired,
  subregionCountries: PropTypes.object,
}

export default MapControles;