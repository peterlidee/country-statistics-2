// displays the header row for CountryList

import { useContext } from 'react'

import fieldsData from '../fields/fieldsData'
import FieldsContext from '../context/FieldsContext'
import Wrapper from '../general/Wrapper'
import CountryListHeader from './CountryListHeader'
import CountryListLegend from './CountryListLegend'

// all header fields for countries list
function CountryListHeaders(){

  const { fields, dispatch } = useContext(FieldsContext);

  return(
    <>
      <Wrapper base={'country-list-header'} modifier={'index'}>{null}</Wrapper>
      {fieldsData.map((field, i) => 
        <CountryListHeader key={field.slug} field={field} />)}
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