import Link from 'next/link';
import useFetch from "react-fetch-hook";
import Sources from '../../sources/Sources';
import Source from '../../sources/Source';

const RegionComponent = (props) => (
  <>
    <div className="single-country__inner-container">
      <div className="single-country__label">neighbouring countries</div>
      <div className="single-country__value">
        {props.children}
      </div>
    </div>
    {props.source &&
      <Sources>
        {props.source}
      </Sources>
    }
  </>
)

// helper function to filter out the matching country
const findMatchingCountry = (border, countries) => countries.filter(country => country.cca3 == border);

function NeighbouringCountries(props){

  // we first need to handle the loading, error and data of the parent components fetch
  // if there's loading and no data
  // (if there's loading and data, we just display the previous data)
  if(props.loading && !props.data) return(
    <RegionComponent>...</RegionComponent>
  )

  // if error
  if(props.error) return(
    <RegionComponent>No data found."</RegionComponent>
  )

  // no data
  if(!props.loading && !props.error && !props.data.borders) return(
    <RegionComponent>No data.</RegionComponent>
  )

  // no borders
  if(!props.loading && !props.error && props.data.borders.length == 0) return(
    <RegionComponent>None (island).</RegionComponent>
  )

  // make the fetch
  const endpoint = `https://restcountries.com/v3.1/alpha/?fields=cca3,name;codes=${props.data.borders.join(',')}`;
  const { isLoading, error, data } = useFetch(endpoint);

  // construct source for this fetch
  const source = <Source endpoint={endpoint} label={"restcountries.com/{codes}"} loading={isLoading} error={error} />;

  // construct the neighbours
  const neighbours = (
    <div className={props.data.borders.length > 6 ? "neighbours-grid" : ""}>
      {props.data.borders.map(border => {

        // find the country from the fetch that matches current border
        // or return [] when there is no data yet (fetch still loading)
        const matchingCountry = data ? findMatchingCountry(border, data) : [];
        // the singleCountry parent fetch will happen before the fetch in this component
        // so there will be border with no country data
        // we catch this by using border as temporary name instead of country.name
        const countryName = matchingCountry[0]?.name?.common || border;
        
        return(
          <div key={`country-${border}`}>
            <Link href={`/country/${border}`}>
              <a className="neighbour-country">{countryName}</a>
            </Link>
          </div>
        )
      })}
    </div>
  )

  return(
    <RegionComponent source={source}>
      {neighbours}
    </RegionComponent>
  )
}

export default NeighbouringCountries;