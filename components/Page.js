import Head from 'next/head';
import Footer from "./Footer";

function Page(props){
    return(
        <>
          <Head>
            <meta name="viewport" content="initial-scale=1.0, width=device-width" key="viewport" />
            <link rel="icon" href="/favicon.png" />
          </Head>
          {props.children}
          <Footer />
        </>
    )
}

export default Page;