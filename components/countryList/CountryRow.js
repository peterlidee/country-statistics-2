import Link from 'next/link'
import PropTypes from 'prop-types'

import fieldsData from '../fields/fieldsData'
import Wrapper from '../general/Wrapper'

function CountryRow({ country, index, hiddenFields }){
  return(
    <>
      <Wrapper base={'country-cell'} modifier="index">
        {index + 1}
      </Wrapper>
      <Wrapper base={'country-cell'} modifier={fieldsData[0].slug}>
        <Link href={`/country/${country.cca3}`}>
          <a>{country[fieldsData[0].key]}</a>
        </Link>
      </Wrapper>
      {[1,2,3].map(number => (
        !hiddenFields.includes(fieldsData[number].slug) && 
          <Wrapper 
            key={fieldsData[number].slug} 
            base={'country-cell'} 
            modifier={fieldsData[number].slug}
          >
            {country[fieldsData[number].key]}
          </Wrapper>
      ))}
    </>
  )
}

CountryRow.propTypes = {
  country: PropTypes.object.isRequired,
  index: PropTypes.number.isRequired,
  hiddenFields: PropTypes.array.isRequired,
}

export default CountryRow;