import Head from 'next/head';
import 'html5-boilerplate/dist/css/normalize.css';
import '../styles/index.scss';

import Page from '../components/Page'

function MyApp({ Component, pageProps }){
    return(
        <Page>
          <Head>
            <link rel="preconnect" href="https://fonts.googleapis.com" />
            <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
            <link href="https://fonts.googleapis.com/css2?family=Inconsolata&family=Quicksand:wght@400;500;700&display=swap" rel="stylesheet" /> 
          </Head>
          <Component {...pageProps} />
        </Page>
    )
}

export default MyApp