import useFetch from "react-fetch-hook";

import Header from "../header/Header";
import Sources from "../sources/Sources";
import Source from "../sources/Source";
import BreadCrumb from "./BreadCrumb";

import SingleCountryBasisStats from "./components/SingleCountryBasicStats";
import SingleCountryFlags from "./components/SingleCountryFlags";
import SingleCountryMap from "./components/SingleCountryMap";
import SingleCountryRegion from "./components/SingleCountryRegion";
import SingleCountryTitle from "./components/SingleCountryTitle";
import SingleCountryWeather from "./components/SingleCountryWeather";


function SingleCountry(props){

  // in this component, we make the main fetch to restcountries
  // it powers title, breadcrumbs and a number of single-country-sections
  const endpoint = `https://restcountries.com/v3.1/alpha/${props.countryCode}?fields=name,population,area,subregion,region,flags,coatOfArms,capital,capitalInfo,cca2,borders,latlng,tld`;
  const { isLoading, error, data } = useFetch(endpoint);

  console.log('data from country fetch',data)

  return(
    <div>
      <Header />
      <BreadCrumb countryName={data?.name?.common} />
      {error && <div>There was a problem with the data.</div>}
      {!error && isLoading && <div>Loading...</div>}
      {!error && !isLoading && !data && <div>There was a problem with the data.</div>}
      {!error && !isLoading && data && (
        <div className="single-country">
          <SingleCountryTitle countryName={data.name.common} />
          <SingleCountryFlags countryName={data.name.common} flag={data.flags.svg} coatOfArms={data.coatOfArms.svg} />
          <SingleCountryBasisStats data={data}>
            <Sources>
              <Source label="restcountries.com/{code}" endpoint={endpoint} error={error} loading={isLoading} />
            </Sources>
          </SingleCountryBasisStats>
          {data.capital[0] && <SingleCountryWeather cca2={data.cca2} capitalName={data.capital[0]} />}
          <SingleCountryMap country={data} />
          <SingleCountryRegion data={data}>
            <Source label="restcountries.com/{code}" endpoint={endpoint} error={error} loading={isLoading} />
          </SingleCountryRegion>
        </div>
      )}
    </div>
  )

}

export default SingleCountry;