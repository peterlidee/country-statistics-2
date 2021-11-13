export async function getServerSideProps(context) {
  return {
    props: {
      countryCode: context.params.countryCode
    },
  }
}

function Country(props){
  return(
    <div>
      country code = {props.countryCode}
    </div>
  )
}

export default Country;