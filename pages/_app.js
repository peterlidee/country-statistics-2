import 'html5-boilerplate/dist/css/normalize.css';
import '../styles/index.scss';

import Page from '../components/Page'

function MyApp({ Component, pageProps }){
    return(
      <Page>
        <Component {...pageProps} />
      </Page>
    )
}

export default MyApp