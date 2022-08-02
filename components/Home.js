import { FieldsContextProvider } from "./context/FieldsContext";
import { RegionFilterContextProvider } from "./context/RegionFilterContext";
import { NumberFiltersContextProvider } from "./context/NumberFiltersContext";

import addExtraData from "../lib/addExtraData";
import getFilterData from "../lib/getFilterData";

import Head from 'next/head';
import Header from './header/Header'
import CountryList from "./countryList/CountryList";
import Sources from "./sources/Sources";
import Source from "./sources/Source";

function Home(props){

  // we need to do some cleanup and some adding to the data
  // we do in this component to prevent rerendering on filtering or display changes
  const countries = addExtraData(props.countries);

  // calculate filter data from the country data
  // this operation will only be called once
  // we need data to filter along: region, subregion, population, area and density
  const filterData = getFilterData(countries);

  return(
    <FieldsContextProvider>
      <Head>
        <title>Country Statistics - a portfolio project</title>
        <meta name="description" content="An overview of statistics per country, fed by different api's." />
      </Head>
      <Header home={true} />
      <RegionFilterContextProvider defaultRegionState={filterData.defaultRegionState}>
        <NumberFiltersContextProvider filterData={filterData}>
          <CountryList countries={countries} filterData={filterData} />
        </NumberFiltersContextProvider>
      </RegionFilterContextProvider>
      <div className="sources__home">
        <Sources>
          {/* since we use ssg, there is data, no loading cause pre rendered and no error cause build succeeded */}
          <Source error={false} loading={false} endpoint={props.endpoint} label="restcountries.com/{all}" />
        </Sources>
      </div>
    </FieldsContextProvider>
  )
}

export default Home;