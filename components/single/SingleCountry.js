import useFetch from "react-fetch-hook";

import Header from "../header/Header";
import Sources from "../sources/Sources";
import Source from "../sources/Source";
import BreadCrumb from "./BreadCrumb";

import SingleCountryTitle from "./sections/SingleCountryTitle";
import SingleCountryStatus from "./sections/SingleCountryStatus";
import SingleCountryFlags from "./sections/SingleCountryFlags";
import SingleCountryBasisStats from "./sections/SingleCountryBasicStats";
import SingleCountryWeather from "./sections/SingleCountryWeather";
import SingleCountryMap from "./sections/SingleCountryMap";
import SingleCountryRegion from "./sections/SingleCountryRegion";
import SingleCountryChart from "./sections/SingleCountryChart";


function SingleCountry(props){

  // in this component, we make the main fetch to restcountries
  // it powers title, breadcrumbs and a number of single-country-sections
  const endpoint = `https://restcountries.com/v3.1/alpha/${props.countryCode}?fields=name,population,area,subregion,region,flags,coatOfArms,capital,capitalInfo,cca2,borders,latlng,tld`;
  const { isLoading, error, data } = useFetch(endpoint);
  
  console.log('data from country fetch',data)
  // construct a source component
  const sources = (
    <Sources topBorder={true} extraClass="title">
      <Source label="restcountries.com/{code}" endpoint={endpoint} error={error} loading={isLoading} />
    </Sources>
  )
  const source = (
      <Source label="restcountries.com/{code}" endpoint={endpoint} error={error} loading={isLoading} extraClass={"title"} />
  )

  // on loading or error or !data return code else the actual name
  const countryName = (error || !data || !data.name) ? props.countryCode : isLoading ? `${props.countryCode}...` : data.name.common;

  // return undefined of flag
  const flag = data?.flags?.svg;

  return(
    <>
      <Header />
      <BreadCrumb countryName={data?.name?.common} />
      <div className="single-country">
        
        <SingleCountryTitle countryName={countryName} />

        <SingleCountryStatus loading={isLoading} error={error} data={data} countryCode={props.countryCode}>
          <Sources topBorder={true} extraClass="status">
            <Source label="restcountries.com/{code}" endpoint={endpoint} error={error} loading={isLoading} />
          </Sources>
        </SingleCountryStatus>

        <SingleCountryFlags 
          countryName={countryName} 
          flag={data?.flags.svg} 
          coatOfArms={data?.coatOfArms.svg} />
        <SingleCountryBasisStats population={data?.population || 0} area={data?.area || 0}>
          <Sources topBorder={true}>{source}</Sources>
        </SingleCountryBasisStats>

        <SingleCountryWeather 
          loading={false}
          error={false}
          // data={data}
          cca2={data?.cca2} 
          capitalName={data?.capital[0]} 
        />

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
        <SingleCountryRegion 
          data={data}
          error={error}
          loading={isLoading}
          source={source} />
        <div className="single-country__component single-country__component--charts">
          <SingleCountryChart countryCode={props.countryCode} type="gdp" />
          <SingleCountryChart countryCode={props.countryCode} type="gdpc" />
        </div>
      </div>
    </>
  )
}

export default SingleCountry;