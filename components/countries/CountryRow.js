import PropTypes from 'prop-types'
import Link from 'next/link'
import { useContext } from 'react'
import FieldsContext from '../context/FieldsContext'

function DivWrap(props){
  return(
    <div className={`country-row__${props.field}`}>
      {props.children}
    </div>
  )
}

DivWrap.propTypes = {
  field: PropTypes.string.isRequired,
}

function CountryRow({country, index}){
  const { fields }  = useContext(FieldsContext);
  return(
    <>
      <DivWrap field="index">{index + 1}</DivWrap>
      <DivWrap field={fields[0].field}>
        <Link href={`/country/${country.cca3}`}>
          <a>{country.name.common}</a>
        </Link>
      </DivWrap>
      {fields[1].display && <DivWrap field={fields[1].field}>{country[fields[1].key]}</DivWrap>}
      {fields[2].display && <DivWrap field={fields[2].field}>{country[fields[2].key]}</DivWrap>}
      {fields[3].display && <DivWrap field={fields[3].field}>{country[fields[3].key]}</DivWrap>}
    </>
  )
}

CountryRow.propTypes = {
  country: PropTypes.object.isRequired,
  index: PropTypes.number.isRequired,
}

export default CountryRow;