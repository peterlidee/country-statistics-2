// Renders the titles of the CountryListHeader
// the title are also sorting buttons

import PropTypes from 'prop-types';

import IconSort from "../svgSnippets/IconSort";
import Wrapper from '../general/Wrapper';

// a single header field for countries list
function CountryListHeader({ field, handleSort }){
  if(!field.display) return null;
  return(
    <Wrapper base={'country-list-header'} modifier={field.field}>
      <button 
        onClick={handleSort}
        className={`button__sort button__sort--${field.field}`}
      >
        <IconSort sortActive={field.sortActive} sortAsc={field.sortAsc} />
        {field.label}
      </button>
    </Wrapper>
  )
}

CountryListHeader.propTypes = {
  field: PropTypes.object.isRequired,
  handleSort: PropTypes.func.isRequired,
}

export default CountryListHeader