import useSWR from "swr";

async function fetcher(url){
  const res = await fetch(url)
  if (!res.ok) {
    let message = '';
    if(res.statusText){
      message += res.statusText;
    }
    const error = new Error(`An error occurred while fetching the data. ${message}`)
    throw error
  }
  return res.json();
}

const API = "https://restcountries.com/v3.1/all?fields=alpha2Code,alpha3Code,borders,area,capital,flag,latlng,name,population,subregion,region";

function Home(){
  const { data, error } = useSWR(API, fetcher);
  
  if(error) return <div>{error.message}</div>
  if(!data) return <div>Loading ...</div>

  console.log('data',data)

  return(
    <div>
      hello from Test
    </div>
  )
}

export default Home;