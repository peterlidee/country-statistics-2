import Link from 'next/link';
import useFetch from "react-fetch-hook";
import PropTypes from 'prop-types';
import Sources from '../../sources/Sources';
import Source from '../../sources/Source';

const LabelAndValue = (props) => (
  <>
    <div className="single-country__label">neighbouring countries</div>
    <div className="single-country__value">
      {props.children}
    </div>
  </>
);

function NeighbouringCountries(props){

  const endpoint = `https://restcountries.com/v3.1/alpha/?fields=cca3,name;codes=${props.borders.join(',')}`;
  const { isLoading, error, data } = useFetch(endpoint);

  // filter out the matchin country
  const findMatchingCountry = (border) => data.filter(country => country.cca3 == border);
  // check if there are borders
  const hasBorders = props.borders.length > 0;

  return(
    <>
      <LabelAndValue>
        {isLoading && "Loading..."}
        {!isLoading && !hasBorders && "None (island)"}
        {!isLoading && error && hasBorders &&  "No data found."}
        {!isLoading && !error && hasBorders &&
          <div className={props.borders.length > 6 ? "neighbours-grid" : ""}>
            {props.borders.map(border => {
              const country = findMatchingCountry(border);
              return <div key={border}>
                <Link href={`/country/${country[0].cca3}`}>
                    <a className="neighbour-country">{country[0].name.common}</a>
                  </Link>
                </div>
            })}
          </div>
        }
      </LabelAndValue>
      {/* props.children is a <Source> component from the parent SingleCountry */}
      <Sources>
        {props.children}
        {props.borders.length > 0 && 
          <Source endpoint={endpoint} label={"restcountries.com/{codes}"} loading={isLoading} error={error} />}
      </Sources>
    </>
  )
}

NeighbouringCountries.propTypes = {
  borders: PropTypes.array.isRequired,
}

export default NeighbouringCountries;