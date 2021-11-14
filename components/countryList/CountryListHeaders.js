// displays the header row for CountryList

import PropTypes from 'prop-types';

import { useContext } from "react";
import FieldsContext from "../context/FieldsContext";
import IconSort from "../svgSnippets/IconSort";
import Wrapper from '../general/Wrapper';

// a single header field for countries list
function CountryListHeader({ field, handleSort }){
  if(field.display){ // only show if display = true
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
  return null;
}

CountryListHeader.propTypes = {
  field: PropTypes.object.isRequired,
  handleSort: PropTypes.func.isRequired,
}

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

// all header fields for countries list
function CountryListHeaders(){

  const { fields, handleSort } = useContext(FieldsContext);
  return(
    <>
      <Wrapper base={'country-list-header'} modifier={'index'}>{null}</Wrapper>
      {fields.map((field, i) => 
        <CountryListHeader 
          field={field} 
          handleSort={() => handleSort(i)} 
          key={`country-list-header-${field.field}`} 
          />
      )}
      <Wrapper base={'country-list-legend'} modifier={'index'}>{null}</Wrapper>
      {fields.map((field, i) => 
        <CountryListLegend 
          field={field} 
          key={`country-list-legend-${field.field}`} 
          />
      )}
    </>
  )
}

export default CountryListHeaders;