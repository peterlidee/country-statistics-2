import propTypes from 'prop-types';
import { addExtraData } from '../lib/addExtraData';
import { DisplayContextProvider } from './context/DisplayContext';
import DisplayOptions from './display/DisplayOptions';

function Countries({ data }){
  console.log('data',data)
  // 1. add density value to all fields
  const countriesWithExtraData = addExtraData(data);
  console.log('countriesWithExtraData',countriesWithExtraData)

  
  // 2. check the filter options
  // 3. check the sorting options
  // 4. check the display options
  // 5. display data
  return(
    <>
      <DisplayContextProvider>
        <DisplayOptions />
      </DisplayContextProvider>
      <div>
        <div>countries</div>
        {countriesWithExtraData.map((country, i) => <div key={i}>{i}</div>)}
      </div>
    </>
  )
}

Countries.propTypes = {
  data: propTypes.array.isRequired
}

export default Countries;