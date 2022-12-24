import Head from 'next/head'
import Header from './header/Header'
import CountryList from './countryList/CountryList'
import Sources from './sources/Sources'
import Source from './sources/Source'

import PropTypes from 'prop-types'

function Home(props){
  return(
    <>
      <Head>
        <title>Country Statistics - a portfolio project</title>
        <meta name="description" content="An overview of statistics per country, fed by different api's." />
      </Head>
      <Header home={true} />
      <CountryList countries={props.countries} filterData={props.filterData} />
      <div className="sources__home">
        <Sources>
          {/* since we use ssg, there is data, no loading cause pre rendered and no error cause build succeeded */}
          <Source error={false} loading={false} endpoint={props.endpoint} label="restcountries.com/{all}" />
        </Sources>
      </div>
    </>
  )
}

Home.propTypes = {
  countries: PropTypes.array.isRequired,
  filterData: PropTypes.object.isRequired,
  endpoint: PropTypes.string.isRequired,
}

export default Home;