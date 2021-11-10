import Header from "./Header";
import Footer from "./Footer";

function Page(props){
    return(
        <>
            <Header />
            <main>
                main content
                {props.children}
            </main>
            <Footer />
        </>
    )
}

export default Page;