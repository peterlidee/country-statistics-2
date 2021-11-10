import React, { useState, createContext } from 'react';

// create context with default value
const DisplayContext = React.createContext({
    // showPopulation: true,
    // showArea: true,
    // showDensity: true,
    // setShowPopulation: () => {},
    // setShowArea: () => {},
    // setShowDensity: () => {},
    options: [],
    displayOptions: {},
    handleDisplayOptions: () => {},
})

const DisplayContextProvider = props => {
    // const [showPopulation, setShowPopulation] = useState(true)
    // const [showArea, setShowArea] = useState(true)
    // const [showDensity, setShowDensity] = useState(true)

    const options = ['population', 'area', 'density'];

    const [ displayOptions, setDisplayOptions ] = useState({
      population: true,
      area: true,
      density: true,
    })
    const handleDisplayOptions = (event) => {
      setDisplayOptions((prevState) => ({
        ...prevState,
        [event.target.value]: !displayOptions[event.target.value]
      }));
    }
    return(
        <DisplayContext.Provider value={{ options, displayOptions, handleDisplayOptions }}>
            {props.children}
        </DisplayContext.Provider>
    )
}

export default DisplayContext;
export { DisplayContextProvider };