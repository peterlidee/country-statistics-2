// Renders the titles of the CountryListHeader
// the titles are also sorting links

import { useRouter } from 'next/router'
import Link from 'next/link'
import PropTypes from 'prop-types'

import Wrapper from '../general/Wrapper'
import IconSort from '../svgSnippets/IconSort'

// a single header field for countries list
function CountryListHeader({ field, sortBy, sortAsc }){

  const router = useRouter()

  // construct the link query
  // if current field is the active field, use reverse props.sortAsc
  // if current field is NOT the active field, use the defaults
  const sortActive = sortBy.includes(field.slug)
  const sortParameter = sortActive ? 
    `${sortAsc ? '-' : ''}${field.slug}` : 
    `${field.sortAscDefault ? '' : '-'}${field.slug}`
    
  return(
    <Wrapper base={'country-list-header'} modifier={field.slug}>
      <Link 
        key={field.slug}
        href={{ 
          pathname: '/', 
          query: { ...router.query, sort: sortParameter }
        }} 
        shallow>
          <a className={`link__sort link__sort--${field.slug}`}>
            {<IconSort sortActive={sortActive} sortAsc={sortAsc} />}
            {field.label}
          </a>
      </Link>
    </Wrapper>
  ) 
}

CountryListHeader.propTypes = {
  field: PropTypes.object.isRequired,
  sortBy: PropTypes.string.isRequired,
  sortAsc: PropTypes.bool.isRequired,
}

export default CountryListHeader