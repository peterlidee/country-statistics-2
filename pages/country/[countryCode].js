import SingleCountry from "../../components/single/SingleCountry";

export async function getServerSideProps(context) {
  return {
    props: {
      countryCode: context.params.countryCode
    },
  }
}

function Country(props){
  return(
    <SingleCountry countryCode={props.countryCode} />
  )
}

export default Country;