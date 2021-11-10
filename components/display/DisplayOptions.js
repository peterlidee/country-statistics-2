import { useContext } from "react";
import DisplayContext from "../context/DisplayContext";

function DisplayOptions(){
  
  const { options, displayOptions, handleDisplayOptions } = useContext(DisplayContext);
  console.log('displayoptions',displayOptions)

  return(
      <div>
        displayoptions
        {options.map(option => (
          <div key={`display-${option}`}>
            <input type="checkbox" value={option} checked={displayOptions[option]} onChange={handleDisplayOptions} id={`display-${option}`} />
            <label htmlFor={`display-${option}`}>
              {option}
            </label>
          </div>
        ))}
      </div>
  )
}

export default DisplayOptions;