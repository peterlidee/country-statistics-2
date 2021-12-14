import Wrapper from '../../general/Wrapper';
import FetchRegionCountries from '../../map/FetchRegionCountries';
import MapWidget from '../../map/MapWidget';
import Proptypes from 'prop-types';

function SingleCountryMap(props){

  if(!props.country.subregion){
    return(
      <Wrapper base="single-country__component" modifier="map">
        <FetchRegionCountries type="region" label={props.country.region}>
          {(regionCountries) => 
            <MapWidget 
              country={props.country} 
              regionCountries={regionCountries} />}
        </FetchRegionCountries>
      </Wrapper>
    )
  }

  return(
    <Wrapper base="single-country__component" modifier="map">
      <FetchRegionCountries type="region" label={props.country.region}>
        {(regionCountries) => (
          <FetchRegionCountries type="subregion" label={props.country.subregion}>
            {(subregionCountries) => 
              <MapWidget 
                country={props.country} 
                regionCountries={regionCountries} 
                subregionCountries={subregionCountries} />}
          </FetchRegionCountries>
        )}
      </FetchRegionCountries>
    </Wrapper>
  )
}

SingleCountryMap.propTypes = {
  country: Proptypes.object.isRequired,
}

export default SingleCountryMap;