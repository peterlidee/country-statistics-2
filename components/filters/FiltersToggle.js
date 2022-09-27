import { useState } from 'react'
import IconFilters from '../svgSnippets/IconFilters'

function FiltersToggle(props){
  const [ toggle, setToggle ] = useState(false);
  const buttonClass=  toggle ? 'filters__toggle-button filters__toggle-button--active' : 'filters__toggle-button'
  const toggleClass = toggle ? 'filters filters--open' : 'filters filters--closed'

  return(
    <>
      <button 
        className={buttonClass} 
        onClick={() => setToggle(!toggle)}
      >
        <IconFilters />
        <span>filter by</span>
      </button>
      <div className={toggleClass}>
        {props.children}
      </div>
    </>
  )
}

export default FiltersToggle