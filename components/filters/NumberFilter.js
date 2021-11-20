import { useState } from "react";
import FilterRange from "./FilterRange";



function NumberFilter(props){

  const [ min, setMin ] = useState(0)
  const [ max, setMax ] = useState(9500)

  const [ sliderMin, setSliderMin ] = useState(0);
  const [ sliderMax, setSliderMax ] = useState(100);

  // const [values, setValues] = useState([30, 70]);
  // const [finalValues, setFinalValues] = useState([30, 70]);

  const [inputSelection, setInputSelection] = useState([0,100])

  const [sliderSelection, setSliderSelection] = useState([0,100])
  const [sliderFinalSelection, setSliderFinalSelection] = useState([0,100])

  const handleInputChange = (e, type) => {
    const value = +e.target.value;
    if(type == 'min'){
      setMin(value)
    }
    if(type == 'max'){
      setMax(value)
    }
  }

  const handleInputSelection = (val) => {
    setInputSelection(val)
  }

  // const onSliderChange = () => {
  //   console.log('onSliderChange',)
  // }

  const handleSliderSelection = (val) => {
    setInputSelection(val);
    setSliderSelection(val);
  }
  const handleSliderFinalSelection = (val) => {
    setSliderFinalSelection(val);
  }

  return(
    <div>
      numberfilter {props.filter.name}
      <FilterRange 
        min={0} 
        max={100} 
        steps={1}
        sliderSelection={sliderSelection} 
        setSliderSelection={setSliderSelection} 
        sliderFinalSelection={sliderFinalSelection} 
        setSliderFinalSelection={setSliderFinalSelection}
        handleSliderSelection={handleSliderSelection}
        handleSliderFinalSelection={handleSliderFinalSelection}
      />
      <div>
        sliderSelection: {sliderSelection[0]} - {sliderSelection[1]}
      </div>
      <div>
        sliderFinalSelection: {sliderFinalSelection[0]} - {sliderFinalSelection[1]}
      </div>
      {/*<div>
        <label htmlFor={`numberfilter-${props.filter}-from`}>from</label>
        <input type="number" value={min} id={`numberfilter-${props.filter}-from`} onChange={(e) => handleInputChange(e, "min")} />
        <label htmlFor={`numberfilter-${props.filter}-to`}>to</label>
        <input type="number" value={max} id={`numberfilter-${props.filter}-to`} onChange={(e) => handleInputChange(e, "max")} />
        <button>filter</button>
      </div>*/}
      <div>
        <label htmlFor={`numberfilter-${props.filter}-from`}>from</label>
        <input type="number" value={inputSelection[0]} id={`numberfilter-${props.filter}-from`} onChange={(e) => handleInputSelection([e.target.value, inputSelection[1]])} />
        <label htmlFor={`numberfilter-${props.filter}-to`}>to</label>
        <input type="number" value={inputSelection[1]} id={`numberfilter-${props.filter}-to`} onChange={(e) => handleInputSelection([inputSelection[0], e.target.value])} />
        <button>filter</button>
      </div>
    </div>
  )
}

export default NumberFilter;