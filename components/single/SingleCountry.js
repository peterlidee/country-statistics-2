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
import SingleCountryPopulationChart from "./sections/SingleCountryPopulationChart";

function SingleCountry(props){

  // we get the data from getStaticProps
  const country = props.country;
  // countryName should be assured with SSG but we still gave it fallback
  const countryName = country.name.common || `${props.countryCode}...`;

  return(
    <>
      <Head>
        <title>{`Country Statistics of ${countryName}`}</title>
        <meta name="description" content={`Country Statistics of ${countryName}`} />
      </Head>
      <Header />
      <BreadCrumb countryName={countryName} />

      <article className="single-country">
        
        <SingleCountryHeader countryName={countryName}>
          <SingleCountryStatus loading={false} error={false} data={country} countryCode={props.countryCode}>
            <Sources>
              {/* since we get data from getStaticProps ... no loading or error */}
              <Source label="restcountries.com/{code}" endpoint={props.singleEndpoint} error={false} loading={false} />
            </Sources>
          </SingleCountryStatus>
        </SingleCountryHeader>

        <SingleCountryFlags 
          countryName={countryName} 
          flag={country?.flags.svg} 
          coatOfArms={country?.coatOfArms.svg} />

        <SingleCountryBasisStats 
          population={country?.population || 0} 
          area={country?.area || 0} />

        <SingleCountryWeather 
          loading={false}
          error={false}
          cca2={country?.cca2} 
          capitalName={country?.capital && country.capital[0] || null}
          countryCode={props.countryCode} />
        
        <SingleCountryMap 
          country={country} />

        <SingleCountryRegion 
          data={country}
          error={false}
          loading={false} />

        <SingleCountryPopulationChart 
          countryCode={props.countryCode} />

      </article>
    </>
  )
}

export default SingleCountry;