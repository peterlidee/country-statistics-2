import Header from "./Header";
import Footer from "./Footer";

function Page(props){
    return(
        <>
            <Header />
            <main>
                {props.children}
            </main>
            <Footer />
        </>
    )
}

export default Page;