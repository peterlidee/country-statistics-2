import useFetch from "react-fetch-hook";

import Header from "../header/Header";
import Sources from "../sources/Sources";
import Source from "../sources/Source";
import BreadCrumb from "./BreadCrumb";

import SingleCountryBasisStats from "./sections/SingleCountryBasicStats";
import SingleCountryFlags from "./sections/SingleCountryFlags";
import SingleCountryMap from "./sections/SingleCountryMap";
import SingleCountryRegion from "./sections/SingleCountryRegion";
import SingleCountryTitle from "./sections/SingleCountryTitle";
import SingleCountryWeather from "./sections/SingleCountryWeather";
import SingleCountryChart from "./sections/SingleCountryChart";


function SingleCountry(props){

  // in this component, we make the main fetch to restcountries
  // it powers title, breadcrumbs and a number of single-country-sections
  const endpoint = `https://restcountries.com/v3.1/alpha/${props.countryCode}?fields=name,population,area,subregion,region,flags,coatOfArms,capital,capitalInfo,cca2,borders,latlng,tld`;
  const { isLoading, error, data } = useFetch(endpoint);
  
  console.log('data from country fetch',data)
  // construct a source component
  const source = <Source label="restcountries.com/{code}" endpoint={endpoint} error={error} loading={isLoading} />;

  // on loading or error or !data return code else the actual name
  const countryName = (error || !data || !data.name) ? props.countryCode : isLoading ? `${props.countryCode}...` : data.name.common;

  // on loading or error or !data return "placeholder" else the actual flag url
  // const flag = (error || isLoading || !data || !data.flags) ? "placeholder" : data.flags.svg;
  const flag = data?.flags?.svg;

  return(
    <>
      <Header />
      <BreadCrumb countryName={data?.name?.common} />
      <div className="single-country">
        
        <SingleCountryTitle countryName={countryName} />
        {error && <div className="single-country__error-message">No data found for {props.countryCode}</div>}
        {!isLoading && !error && !data && <div className="single-country__error-message">No data found for {props.countryCode}</div>}
        <SingleCountryFlags 
          countryName={countryName} 
          flag={data?.flags.svg} 
          coatOfArms={data?.coatOfArms.svg} />
        <SingleCountryBasisStats population={data?.population || 0} area={data?.area || 0}>
          <Sources topBorder={true}>{source}</Sources>
        </SingleCountryBasisStats>
        <SingleCountryRegion 
          data={data}
          error={error}
          loading={isLoading}
          source={source} />

        {error && <div>There was a problem with the data.</div>}
        {!error && isLoading && <div>Loading...</div>}
        {!error && !isLoading && !data && <div>There was a problem with the data.</div>}
        {!error && !isLoading && data && (
          <>
            {/*
            {data.capital[0] && <SingleCountryWeather cca2={data.cca2} capitalName={data.capital[0]} />}
            <SingleCountryMap country={data} />
          */}
          </>
        )}
        {/* we don't need the data from the fetch so we put it outside of the loading, error and data conditionals */}
        <div className="single-country__component single-country__component--charts">
          <SingleCountryChart countryCode={props.countryCode} type="gdp" />
          <SingleCountryChart countryCode={props.countryCode} type="gdpc" />
        </div>
      </div>
    </>
  )
}

export default SingleCountry;