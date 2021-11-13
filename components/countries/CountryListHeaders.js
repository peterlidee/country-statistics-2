// displays the header row for CountryList

import { useContext } from "react";
import FieldsContext from "../context/FieldsContext";

function DivWrap(props){
  return(
    <div className={`country-list-header__${props.label.toLowerCase()}`}>{props.children}</div>
  )
}

function CountryListHeader({field}){
  if(field.display){ // only show if display = true
    return(
      <DivWrap label={field.label}>
        <>{field.label}</>
      </DivWrap>
    )
  }
  return null;
}

function CountryListHeaders(props){

  const { fields, handleDisplay } = useContext(FieldsContext);
  //console.log('options',options)

  return(
    <>
      <DivWrap label={"index"}>{null}</DivWrap>
      {fields.map((field, i) => <CountryListHeader field={field} key={`countrylistheader-${field.label}`} />)}

      {/*
      <div className="country-list-header__country">
        <button className="button__sort">Country</button>
      </div>
      <div className="country-list-header__population">Population</div>
      <div className="country-list-header__area">Area</div>
      <div className="country-list-header__density">Density</div>
       */}
    </>
  )
}

export default CountryListHeaders;