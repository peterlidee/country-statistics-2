// displays the header row for CountryList

import PropTypes from 'prop-types';

import fieldsData from '../fields/fieldsData'
import Wrapper from '../general/Wrapper'
import CountryListHeader from './CountryListHeader'
import CountryListLegend from './CountryListLegend'

// all header fields for countries list
function CountryListHeaders({ hiddenFields, sortBy, sortAsc }){
  return(
    <>
      <Wrapper base={'country-list-header'} modifier={'index'}>{null}</Wrapper>
      {fieldsData.map((field, i) => {
        // check if the field is to be displayed or not
        if(hiddenFields.includes(field.slug)) return null
        return <CountryListHeader key={field.slug} field={field} sortBy={sortBy} sortAsc={sortAsc} />
      })}
      <Wrapper base={'country-list-legend'} modifier={'index'}>{null}</Wrapper>
      {fieldsData.map((field, i) => {
        // check if the field legend is to be displayed or not
        if(hiddenFields.includes(field.slug)) return null
        return <CountryListLegend field={field} key={`country-list-legend-${field.slug}`} />
      })}
    </>
  )
}

CountryListHeaders.propTypes = {
  hiddenFields: PropTypes.array.isRequired,
  sortBy: PropTypes.string.isRequired,
  sortAsc: PropTypes.bool.isRequired,
}

export default CountryListHeaders