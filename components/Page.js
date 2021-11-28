import Footer from "./Footer";

function Page(props){
    return(
        <>
          {props.children}
          <Footer />
        </>
    )
}

export default Page;