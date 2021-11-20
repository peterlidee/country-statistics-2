import { useState } from "react";

function NumberFilter(props){

  const [ min, setMin ] = useState(0)
  const [ max, setMax ] = useState(9500)

  const handleInputChange = (e, type) => {
    const value = +e.target.value;
    if(type == 'min'){
      setMin(value)
    }
    if(type == 'max'){
      setMax(value)
    }
  }

  return(
    <div>
      numberfilter {props.filter.name}
      slider
      <div>
        <label htmlFor={`numberfilter-${props.filter}-from`}>from</label>
        <input type="number" value={min} id={`numberfilter-${props.filter}-from`} onChange={(e) => handleInputChange(e, "min")} />
        <label htmlFor={`numberfilter-${props.filter}-to`}>to</label>
        <input type="number" value={max} id={`numberfilter-${props.filter}-to`} onChange={(e) => handleInputChange(e, "max")} />
        <button>filter</button>
      </div>
    </div>
  )
}

export default NumberFilter;