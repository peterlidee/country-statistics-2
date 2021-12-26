import Wrapper from '../../general/Wrapper';
import FetchRegionCountries from '../map/FetchRegionCountries';
import MapWidget from '../map/MapWidget';
import Placeholder from '../../svgSnippets/Placeholder';

function SingleCountryMap(props){

  // wait for the parent query in SingleCountry to load
  if(!props.country) return(
    <Wrapper base="single-country__component" modifier="map">
      <Placeholder backgroundColor={"#aaa"} extraClass="placeholder-map" />
    </Wrapper>
  )

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

export default SingleCountryMap;