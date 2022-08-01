import { useContext, useState } from "react";
import FieldsContext from "../context/FieldsContext";
import IconSettings from "../svgSnippets/IconSettings";

function FieldSettings(){

  const { fields, dispatch } = useContext(FieldsContext);
  const [ toggle, setToggle ] = useState(false);

  return(
    <div className="settings">
      <button className={`settings__button ${toggle ? 'settings__button--active' : ''}`} onClick={() => setToggle(!toggle)}>
        <IconSettings />
        <span className="settings__button__innertext">settings</span>
      </button>
      <div className="settings__collapse" style={{ display: toggle ? "block" : "none" }}>
        <div className="settings__title">display columns:</div>
        {fields.map((field, index) => {
          if(!field.displayToggle) return null;
          return(
            <div key={`fieldsetting-${field.field}`}>
              <input 
                type="checkbox" 
                value={field.field}
                checked={field.display} 
                onChange={() => dispatch({ type: "display", index: index })} 
                id={`fieldsetting-${field.field}`} 
                className="settings__checkbox"
              />
              <label htmlFor={`fieldsetting-${field.field}`}>
                {field.label}
              </label>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default FieldSettings;