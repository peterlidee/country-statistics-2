// displays the header row for CountryList

import PropTypes from 'prop-types';

import { useContext } from "react";
import FieldsContext from "../context/FieldsContext";
import IconSort from "../svgSnippets/IconSort";

function DivWrap(props){
  return(
    <div className={`country-list-header__${props.field}`}>{props.children}</div>
  )
}

DivWrap.propTypes = {
  field: PropTypes.string.isRequired
}

// a single header field for countries list
function CountryListHeader({ field, handleSort }){
  if(field.display){ // only show if display = true
    return(
      <DivWrap field={field.field}>
        <button 
          onClick={handleSort}
          className={`button-sort button-sort--${field.field}`}
        >
          <IconSort sortActive={field.sortActive} sortAsc={field.sortAsc} />
          {field.label}
        </button>
      </DivWrap>
    )
  }
  return null;
}

CountryListHeader.propTypes = {
  field: PropTypes.object.isRequired,
  handleSort: PropTypes.func.isRequired,
}

// all header fields for countries list
function CountryListHeaders(){

  const { fields, handleSort } = useContext(FieldsContext);
  return(
    <>
      <DivWrap field={"index"}>{null}</DivWrap>
      {fields.map((field, i) => 
        <CountryListHeader 
          field={field} 
          handleSort={() => handleSort(i)} 
          key={`countrylistheader-${field.label}`} 
          />
        )}
    </>
  )
}

export default CountryListHeaders;