import { useContext } from "react";
//import DisplayContext from "../context/DisplayContext";
import FieldsContext from "../context/FieldsContext";

function DisplayOptions(){
  
  // const { options, displayOptions, handleDisplayOptions } = useContext(DisplayContext);
  // console.log('displayoptions',displayOptions)

  const { fields, handleDisplay } = useContext(FieldsContext);

  return(
    <div>
      fieldsettings
      {fields.map((field, index) => {
        if(!field.displayToggle) return null;
        return(
          <div key={`fieldsetting-${field.field}`}>
            <input 
              type="checkbox" 
              value={field.field}
              checked={field.display} 
              onChange={(event) => handleDisplay(index, event)} 
              id={`fieldsetting-${field.field}`} 
            />
            <label htmlFor={`fieldsetting-${field.field}`}>
              {field.label}
            </label>
          </div>
        )
      })}
    </div>
  )

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