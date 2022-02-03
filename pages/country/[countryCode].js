/*
  I was gonna write this as a SSG page with fallback true
  But because of a badly configured api, I had to abandon it
  https://restcountries.com/v3.1/alpha/hhh returned a 200 ok with an empty array
  instead of a 400
  correct behaviour on https://restcountries.com/v3.1/alpha/hhhh
  reported as bug https://gitlab.com/amatos/rest-countries/-/issues/107
*/

// TODO: make custom error page

import SingleCountry from "../../components/single/SingleCountry";

function Country(props){
  return(
    <SingleCountry 
      countryCode={props.countryCode}
      singleEndpoint={props.singleEndpoint}
      country={props.country} />
  )
}

export async function getStaticPaths(){

  // get all the possible endpoints
  const pathsEndpoint = 'https://restcountries.com/v3.1/all?fields=cca3';
  // make the fetch
  const res = await fetch(pathsEndpoint);
  const countryCodes = await res.json();
  // return the cca3 codes in correct format
  const paths = countryCodes.map(countryCode => ({ params: { "countryCode": countryCode.cca3 }}))

  return {
    paths,
    fallback: false, // see notes on top
  }
}

export async function getStaticProps(context){

  // get url param out of context
  const countryCode = context.params.countryCode;
  
  // the endpoint
  /* 
    we used to call the endpoint with specific fields
    f.e. https://restcountries.com/v3.1/alpha/${countryCode}?fields=name
    But, the api isn't consistent here and we had to abandon it
    https://restcountries.com/v3.1/alpha/${countryCode} returns [{country}]
    https://restcountries.com/v3.1/alpha/${countryCode}?fields=name returns {country}
    Now, we call api without fields param, this increases the traffic but avoids critical errors
    
    // old endpoint
    const singleEndpoint = `https://restcountries.com/v3.1/alpha/${countryCode}?fields=name,population,area,subregion,region,flags,coatOfArms,capital,capitalInfo,cca2,borders,latlng,tld`;
  */

  // make fetch
  // new endpoint
  const singleEndpoint = `https://restcountries.com/v3.1/alpha/${countryCode}`;
  const res = await fetch(singleEndpoint);
  const countries = await res.json();

  // this call usually returns a single object in an array (one exception is brunei/bahrain)
  // so, we filter out the country with the corresponding cca3
  const country = countries.find(country => country.cca3 === countryCode)

  // return props
  return {
    props: {
      countryCode,
      singleEndpoint,
      country,
    },
  }
}

export default Country;