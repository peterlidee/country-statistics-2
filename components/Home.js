import PropTypes from 'prop-types'

import { FieldsContextProvider } from "./context/FieldsContext";
import { RegionFilterContextProvider } from "./context/RegionFilterContext";
import { NumberFiltersContextProvider } from "./context/NumberFiltersContext";

import Head from 'next/head';
import Header from './header/Header'
import CountryList from "./countryList/CountryList";
import Sources from "./sources/Sources";
import Source from "./sources/Source";

function Home(props){
  return(
    <FieldsContextProvider>
      <Head>
        <title>Country Statistics - a portfolio project</title>
        <meta name="description" content="An overview of statistics per country, fed by different api's." />
      </Head>
      <Header home={true} />
      <RegionFilterContextProvider defaultRegionState={props.filterData.defaultRegionState}>
        <NumberFiltersContextProvider filterData={props.filterData}>
          <CountryList countries={props.countries} filterData={props.filterData} />
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

Home.propTypes = {
  countries: PropTypes.array.isRequired,
  filterData: PropTypes.object.isRequired,
  endpoint: PropTypes.string.isRequired,
}

export default Home;