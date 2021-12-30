import Link from 'next/link';
import useFetch from "react-fetch-hook";
import Wrapper from '../../general/Wrapper';
import Sources from '../../sources/Sources';
import Source from '../../sources/Source';

/*
 this is quit a complex component
we need 

<Wrapper>
  <div> region subregion capital neighbours </div>
  <Sources>
</Wrapper>

But the source props come from neighbours
So we have to feed region, subregion and capital to neighbours and render them from there as props.children
On the same level (here) as we can use source with the fetch data from neighbours

On top of that we need a lot of checks to see if we have to call the neighbours fetch.

*/

const RegionComponent = (props) => (
  <Wrapper base="single-country__component" modifier="region">
    <div className="single-country__inner-mobile-container">
      {props.children}
      <div className="single-country__label">neighbouring countries</div>
      <div className="single-country__value">
        {props.value}
      </div>
    </div>
    {props.source &&
      <Sources>
        {props.source}
      </Sources>
    }
  </Wrapper>
)

// helper function to filter out the matching country
const findMatchingCountry = (border, countries) => countries.filter(country => country.cca3 == border);

function NeighbouringCountries(props){

  // we first need to handle the loading, error and data of the parent components fetch
  // if there's loading and no data
  // (if there's loading and data, we just display the previous data)
  if(props.loading && !props.data) return(
    <RegionComponent value="...">{props.children}</RegionComponent>
  )

  // if error
  if(props.error) return(
    <RegionComponent value="No data found.">{props.children}</RegionComponent>
  )

  // no data
  if(!props.loading && !props.error && !props.data.borders) return(
    <RegionComponent value="No data.">
      {props.children}
    </RegionComponent>
  )

  // no borders
  if(!props.loading && !props.error && props.data.borders.length == 0) return(
    <RegionComponent value="None (island).">
      {props.children}
    </RegionComponent>
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
    <RegionComponent source={source} value={neighbours}>
      {props.children}
    </RegionComponent>
  )
}

export default NeighbouringCountries;