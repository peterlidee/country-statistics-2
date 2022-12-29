import Link from 'next/link'

import fieldsData from '../fields/fieldsData'
import Wrapper from '../general/Wrapper'

import PropTypes from 'prop-types'

function CountryRow({ country, index, activeHidden }){
  return(
    <>
      <Wrapper base={'country-cell'} modifier="index">
        {index + 1}
      </Wrapper>
      <Wrapper base={'country-cell'} modifier={fieldsData[0].slug}>
        <Link href={`/country/${country.cca3}`}>{country[fieldsData[0].key]}</Link>
      </Wrapper>
      {[1,2,3].map(number => (
        !activeHidden.includes(fieldsData[number].slug) && 
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
  activeHidden: PropTypes.array.isRequired,
}

export default CountryRow;