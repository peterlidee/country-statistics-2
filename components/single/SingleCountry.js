import useFetch from "react-fetch-hook";

import Header from "../header/Header";
import Sources from "../Sources";
import BreadCrumb from "./BreadCrumb";
import SingleCountryBasisStats from "./components/SingleCountryBasicStats";
import SingleCountryFlags from "./components/SingleCountryFlags";
import SingleCountryTitle from "./components/SingleCountryTitle";
import SingleCountryWeather from "./components/SingleCountryWeather";

function SingleCountry(props){

  // in this component, we make the main fetch to restcountries
  // it powers title, breadcrumbs and a number of single-country-sections

  // https://restcountries.com/v3.1/alpha/AFG?fields=name,population,area,subregion,region,flags,coatOfArms,capital,capitalInfo

  //const endpoint = `https://restcountries.com/v3.1/alpha/${props.countryCode}?fields=name,population,area,subregion,region,flags,coatOfArms,capital,capitalInfo`;

  const endpoint = `https://restcountries.com/v3.1/alpha/${props.countryCode}?fields=name,population,area,subregion,region,flags,coatOfArms,capital,capitalInfo,cca2`;

  const { isLoading, error, data } = useFetch(endpoint);

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
            <Sources label="restcountries.com" endpoint={endpoint} error={error} loading={isLoading} />
          </SingleCountryBasisStats>
          {data.capital[0] && <SingleCountryWeather cca2={data.cca2} capitalName={data.capital[0]} />}
        </div>
      )}
    </div>
  )

}

export default SingleCountry;