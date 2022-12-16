import useFetch from 'react-fetch-hook'
import Link from 'next/link'
import Source from '../../sources/Source'
import NeighbourComponent from './NeighbourComponent'
import findMatchingCountry from '../../../lib/single/findMatchingCountry'
import PropTypes from 'prop-types'

// by the time this component get loaded, the error, loading and data of the parent (singleCountries) are already handled by  ValidateNeighbouringCountries and props.borders is garanteed
// we did all this to avoid conditional useFetch (having a return before useFetch)
function NeighbouringCountries(props){

  // make the fetch
  const endpoint = `https://restcountries.com/v3.1/alpha/?fields=cca3,name;codes=${props.borders.join(',')}`;
  const { isLoading, error, data } = useFetch(endpoint);

  // construct source for this fetch
  const source = <Source endpoint={endpoint} label={"restcountries.com/{codes}"} loading={isLoading} error={error} />;

  // construct the neighbours
  const neighbours = (
    <div className={props.borders.length > 6 ? "neighbours-grid" : ""}>
      {props.borders.map(border => {

        // find the country from the fetch that matches current border
        // or return [] when there is no data yet (fetch still loading)
        const matchingCountry = data ? findMatchingCountry(border, data) : [];
        // the singleCountry parent fetch will happen before the fetch in this component
        // so there will be border with no country data
        // we catch this by using border as temporary name instead of country.name
        const countryName = matchingCountry[0]?.name?.common || border;
        
        return(
          <div key={`country-${border}`}>
            <Link href={`/country/${border}`} className="neighbour-country">{countryName}</Link>
          </div>
        )
      })}
    </div>
  )

  return(
    <NeighbourComponent source={source}>
      {neighbours}
    </NeighbourComponent>
  )
}

NeighbouringCountries.propTypes = {
  borders: PropTypes.array.isRequired,
}

export default NeighbouringCountries;