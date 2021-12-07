import Proptypes from 'prop-types';
import Wrapper from '../../general/Wrapper';

function SingleCountryMap(props){

  return(
    <Wrapper base="single-country__component" modifier="map">
      map
    </Wrapper>
  )
}

SingleCountryMap.propTypes = {
  //data: Proptypes.object.isRequired,
}

export default SingleCountryMap;