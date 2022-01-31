import Home from "../components/Home";

function HomePage(props){
  return <Home countries={props.countries} endpoint={props.endpoint} />
}

export async function getStaticProps(){

  const endpoint = 'https://restcountries.com/v3.1/all?fields=cca3,area,name,population,subregion,region';

  const res = await fetch(endpoint);
  const countries = await res.json();

  return {
    props: {
      countries: countries,
      endpoint: endpoint, // todo: rework source
    }
  }
}

export default HomePage;