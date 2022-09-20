// Renders the titles of the CountryListHeader
// the titles are also sorting links

import { useRouter } from 'next/router'
import Link from 'next/link'
import PropTypes from 'prop-types'

import Wrapper from '../general/Wrapper'
import IconSort from '../svgSnippets/IconSort'

// a single header field for countries list
function CountryListHeader({ field }){

  const router = useRouter()

  // construct the query sort argument
  let sortAsc = field.sortAscDefault
  let sortActive = false
  let sortPrefix = field.sortAscDefault ? '' : '-'
  let sortParameter = sortPrefix + field.slug

  if(router.query.hasOwnProperty('sort')){
    // if current field is the active sort
    if(router.query.sort.includes(field.slug)){
      // set to reverse of current value
      sortParameter = router.query.sort.includes('-') ? router.query.sort.slice(1) : `-${router.query.sort}`
      sortAsc = !router.query.sort.includes('-')
      sortActive = true
    }else{
      // not current field, use default
      // sortParameter = sortPrefix + field.slug
    }
  }else{
    // use default
    // sortParameter = sortPrefix + field.slug
    sortActive = field.slug === 'country' ? true : false
  }

  // TODO: 
  // if(!field.display) return null;
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
}

export default CountryListHeader