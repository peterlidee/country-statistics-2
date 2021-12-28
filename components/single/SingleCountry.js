import useFetch from "react-fetch-hook";
import Head from "next/head";

import Header from "../header/Header";
import Sources from "../sources/Sources";
import Source from "../sources/Source";
import BreadCrumb from "./BreadCrumb";

import SingleCountryHeader from "./sections/SingleCountryHeader";
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

  // on loading or error or !data return code else the actual name
  const countryName = (error || !data || !data.name) ? props.countryCode : isLoading ? `${props.countryCode}...` : data.name.common;

  return(
    <>
      <Head>
        <title>Country Statistics of {countryName}</title>
        <meta name="description" content={`Country Statistics of ${countryName}`} />
      </Head>
      <Header />
      <BreadCrumb countryName={countryName} />

      <article className="single-country">
        
        <SingleCountryHeader countryName={countryName}>
          <SingleCountryStatus loading={isLoading} error={error} data={data} countryCode={props.countryCode}>
            <Sources topBorder={true} extraClass="status">
              <Source label="restcountries.com/{code}" endpoint={endpoint} error={error} loading={isLoading} />
            </Sources>
          </SingleCountryStatus>
        </SingleCountryHeader>

        <SingleCountryFlags 
          countryName={countryName} 
          flag={data?.flags.svg} 
          coatOfArms={data?.coatOfArms.svg} />

        <SingleCountryBasisStats 
          population={data?.population || 0} 
          area={data?.area || 0} />

        <SingleCountryWeather 
          loading={isLoading}
          error={error}
          cca2={data?.cca2} 
          capitalName={data?.capital[0]}
          countryCode={props.countryCode} />
        
        <SingleCountryMap 
          country={data} />

        <SingleCountryRegion 
          data={data}
          error={error}
          loading={isLoading} />

        <div className="single-country__component single-country__component--charts">
          <SingleCountryChart countryCode={props.countryCode} type="gdp" />
          <SingleCountryChart countryCode={props.countryCode} type="gdpc" />
        </div>

      </article>
    </>
  )
}

export default SingleCountry;