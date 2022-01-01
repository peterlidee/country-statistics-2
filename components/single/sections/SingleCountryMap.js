import Wrapper from '../../general/Wrapper';
import BoxWrapper from '../../general/BoxWrapper';

import FetchRegionCountries from '../map/FetchRegionCountries';
import MapWidget from '../map/MapWidget';
import Placeholder from '../../svgSnippets/Placeholder';

function SingleCountryMap(props){

  // wait for the parent query in SingleCountry to load
  // TODO
  if(!props.country) return(
    <BoxWrapper name="map">
      <Placeholder />
    </BoxWrapper>
  )

  if(!props.country.subregion){
    return(
      <FetchRegionCountries type="region" label={props.country.region}>
        {(regionCountries) => 
          <MapWidget 
            country={props.country} 
            regionCountries={regionCountries} />}
      </FetchRegionCountries>
    )
  }

  return(
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
  )
}

export default SingleCountryMap;