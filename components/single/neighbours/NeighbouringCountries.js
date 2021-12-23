import Link from 'next/link';
import useFetch from "react-fetch-hook";
import Sources from '../../sources/Sources';
import Source from '../../sources/Source';

const LabelAndValue = (props) => (
  <>
    <div className="single-country__label">neighbouring countries</div>
    <div className="single-country__value">
      {props.children}
    </div>
    {props.source &&
      <Sources topBorder={true}>
        {props.source}
      </Sources>
    }
  </>
);

function NeighbouringCountries(props){

  // we first need to handle the loading, error and data of the components fetch
  if(props.loading || props.error || !props.borders || props.borders.length == 0) return(
    <LabelAndValue>
      {props.loading && "..."}
      {props.error && "No data found."}
      {!props.loading && !props.error && !props.borders && "No data found."}
      {!props.loading && !props.error && props.borders && props.borders.length == 0 && "None (island)."}
    </LabelAndValue>
  )

  const endpoint = `https://restcountries.com/v3.1/alpha/?fields=cca3,name;codes=${props.borders.join(',')}`;
  const { isLoading, error, data } = useFetch(endpoint);

  // filter out the matching country
  const findMatchingCountry = (border, countries) => countries.filter(country => country.cca3 == border);

  return(
    <LabelAndValue source={props.borders.length > 0 && 
      <Source endpoint={endpoint} label={"restcountries.com/{codes}"} loading={isLoading} error={error} />}
    >
      <div className={props.borders.length > 6 ? "neighbours-grid" : ""}>
        {props.borders.map(border => {
          if(isLoading || error) return <div key={border}>{border}</div>
          const country = findMatchingCountry(border, data);
          return(
            <div key={border}>
              <Link href={`/country/${country[0].cca3}`}>
                <a className="neighbour-country">{country[0].name.common}</a>
              </Link>
            </div>
          )
        })}
      </div>
    </LabelAndValue>
  )
}

export default NeighbouringCountries;