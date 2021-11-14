import PropTypes from 'prop-types'
import Link from 'next/link'
import { useContext } from 'react'
import FieldsContext from '../context/FieldsContext'
import Wrapper from '../general/Wrapper'

function CountryRow({country, index}){
  const { fields }  = useContext(FieldsContext);
  return(
    <>
      <Wrapper base={'country-cell'} modifier="index">
        {index + 1}
      </Wrapper>
      <Wrapper base={'country-cell'} modifier={fields[0].field}>
        <Link href={`/country/${country.cca3}`}>
          <a>{country[fields[0].key]}</a>
        </Link>
      </Wrapper>
      {fields[1].display && <Wrapper base={'country-cell'} modifier={fields[1].field}>{country[fields[1].key]}</Wrapper>}
      {fields[2].display && <Wrapper base={'country-cell'} modifier={fields[2].field}>{country[fields[2].key]}</Wrapper>}
      {fields[3].display && <Wrapper base={'country-cell'} modifier={fields[3].field}>{country[fields[3].key]}</Wrapper>}
    </>
  )
}

CountryRow.propTypes = {
  country: PropTypes.object.isRequired,
  index: PropTypes.number.isRequired,
}

export default CountryRow;