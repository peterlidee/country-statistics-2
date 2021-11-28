import { useContext } from "react";
import FieldsContext from "../context/FieldsContext";

function DisplayOptions(){

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
              onChange={() => handleDisplay(index)} 
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
}

export default DisplayOptions;