import useSWR from "swr";
import Head from 'next/head';

import CountryList from "./countryList/CountryList";
import { FieldsContextProvider } from "./context/FieldsContext";
import { addExtraData } from "../lib/addExtraData";

async function fetcher(url){
  const res = await fetch(url)
  if (!res.ok) {
    let message = '';
    if(res.statusText){
      message += res.statusText;
    }
    const error = new Error(`An error occurred while fetching the data. ${message}`)
    throw error
  }
  return res.json();
}

const API = "https://restcountries.com/v3.1/all?fields=cca3,area,name,population,subregion,region,code";

function Home(){

  const { data, error } = useSWR(API, fetcher, { revalidateOnFocus: false });
  
  if(error) return <div>{error.message}</div>
  if(!data) return <div>Loading ...</div>

  // we need to do some cleanup and some adding to the data
  // we do in this component to prevent rerendering on filtering or display changes
  const dataExtra = addExtraData(data);

  return(
    <div>
      <Head>
        {/* todo */}
        <title>Country Statistics - a portfolio project</title>
        <meta name="description" content="An overview of statistics per country, fed by different api's." />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" key="viewport" />
        <link rel="icon" href="/favicon.png" />
      </Head>
      <p>this is some text from the Home component. Lets see how it works for typography? hello from Test</p>
      <FieldsContextProvider>
        <CountryList data={dataExtra} />
      </FieldsContextProvider>
    </div>
  )
}

export default Home;