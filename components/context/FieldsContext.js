import React, { useState, createContext } from 'react';

// create context with default value
const FieldsContext = React.createContext({
    // showPopulation: true,
    // showArea: true,
    // showDensity: true,
    // setShowPopulation: () => {},
    // setShowArea: () => {},
    // setShowDensity: () => {},
    // options: [],
    // displayOptions: {},
    // handleDisplayOptions: () => {},
    fields: [],
    handleDisplay: () => {}
})

const FieldsContextProvider = props => {
    // const [showPopulation, setShowPopulation] = useState(true)
    // const [showArea, setShowArea] = useState(true)
    // const [showDensity, setShowDensity] = useState(true)

    const [fields, setFields] = useState([
      {
        field: 'country',
        label: 'Country',
        key: ['name', 'common'],
        display: true,
        displayToggle: false,
        tooltip: false,
        tooltipText: '',
        sortActive: false,
        sortAsc: true,
      },
      {
        field: 'population',
        label: 'Population',
        key: 'populationPrettyFormat',
        display: true,
        displayToggle: true,
        tooltip: true,
        tooltipText: 'Number of inhabitants',
        sortActive: false,
        sortAsc: true,
      },
      {
        field: 'area',
        label: 'Area',
        key: 'areaPrettyFormat',
        display: true,
        displayToggle: true,
        tooltip: true,
        tooltipText: 'Country size in km²',
        sortActive: false,
        sortAsc: true,
      },
      {
        field: 'density',
        label: 'Density',
        key: 'densityPrettyFormat',
        display: true,
        displayToggle: true,
        tooltip: true,
        tooltipText: 'Inhabitants per km²',
        sortActive: false,
        sortAsc: true,
      },
    ])

    const [country, setCountry] = useState({
      field: 'country',
      label: 'Country',
      keys: ['name', 'common'],
      display: true,
      displayToggle: false,
      tooltip: false,
      tooltipText: '',
      sortActive: false,
      sortAsc: true,
    });

    const [population, setPopulation] = useState({
      field: 'population',
      label: 'Population',
      keys: 'populationPrettyFormat',
      display: true,
      displayToggle: true,
      tooltip: true,
      tooltipText: 'Number of inhabitants',
      sortActive: false,
      sortAsc: true,
    })

    const [area, setArea] = useState({
      field: 'area',
      label: 'Area',
      keys: 'AreaPrettyFormat',
      display: true,
      displayToggle: true,
      tooltip: true,
      tooltipText: 'Country size in km²',
      sortActive: false,
      sortAsc: true,
    });

    const [density, setDensity] = useState({
      field: 'density',
      label: 'Density',
      keys: 'densityPrettyFormat',
      display: true,
      displayToggle: true,
      tooltip: true,
      tooltipText: 'Inhabitants per km²',
      sortActive: false,
      sortAsc: true,
    });

    // const options = ['population', 'area', 'density'];

    // const [ displayOptions, setDisplayOptions ] = useState({
    //   population: true,
    //   area: true,
    //   density: true,
    // })

    const handleDisplay = (index, event) => {

      console.log('handleDisplay',event.target.value, index)
      
      // from e.target.value, we know which field to change
      // and the change to make is !currentValue
      // the index gives us with item in state fields array to change

      // make a copy of state
      const fieldsCopy =  [...fields];
      // make change
      fieldsCopy[index].display = !fieldsCopy[index].display;
      // set new state
      setFields(fieldsCopy);
      
      // // retrieve field to change
      // const fieldCopy = fieldsCopy.slice(index, index + 1)[0];
      // fieldCopy.field = 'boo';
      // console.log('copy',fieldCopy)

      // // change fieldCopy with updated value
      // fieldCopy[event.target.value] = !fields[index][event.target.value];

      // // update state
      // setFields


      
      //[e.target.value].display = ![e.target.value].display;

      // if(event.target.value == 'population'){
      //   setPopulation({
      //     ...population,
      //     display: !population.display
      //   })
      // }

      // console.log('handling options change',)
      // setDisplayOptions((prevState) => ({
      //   ...prevState,
      //   [event.target.value]: !displayOptions[event.target.value]
      // }));
    }

    return(
        <FieldsContext.Provider value={{ 
          fields, 
          handleDisplay 
        }}>
            {props.children}
        </FieldsContext.Provider>
    )
}

export default FieldsContext;
export { FieldsContextProvider };