// field display options toggle component

import { useState } from 'react'
import IconSettings from '../svgSnippets/IconSettings'

function FieldSettings(props){
  const [ toggle, setToggle ] = useState(false);
  return(
    <div className="settings">
      <button className={`settings__button ${toggle ? 'settings__button--active' : ''}`} onClick={() => setToggle(!toggle)}>
        <IconSettings />
        <span className="settings__button__innertext">settings</span>
      </button>
      <div className="settings__collapse" style={{ display: toggle ? "block" : "none" }}>
        {props.children}
      </div>
    </div>
  )
}

export default FieldSettings;