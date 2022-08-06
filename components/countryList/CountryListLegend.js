// Renders the legends (subtext) of the countryListHeader

import PropTypes from 'prop-types'
import Wrapper from '../general/Wrapper'

// a single legend field for countries list
function CountryListLegend({ field }){
  if(!field.display) return null;
  return(
    <Wrapper base={'country-list-legend'} modifier={field.field}>
      {field.hasOwnProperty('legend') && field.legend}
    </Wrapper>
  )
}
CountryListLegend.prototype = {
  field: PropTypes.object.isRequired
}

export default CountryListLegend