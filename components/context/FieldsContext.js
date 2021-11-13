import React, { useState } from 'react';

// create context with default value
const FieldsContext = React.createContext({
    fields: [],
    handleDisplay: () => {}
})

const FieldsContextProvider = props => {

  // state is an array of 4 object: country, population, area and density
  // each has properties to render them, to display them or not and to sort them
  const [fields, setFields] = useState([
    {
      field: 'country',
      label: 'Country',
      key: 'countryName',
      display: true,
      displayToggle: false,
      tooltip: false,
      tooltipText: '',
      sortActive: true,
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

  // this function handles changes in fields being displayed or not
  // TODO: do we need event????
  const handleDisplay = (index, event) => {
    
    // from e.target.value, we know which field to change
    // and the change to make is !currentValue
    // the index gives us with item in state fields array to change

    // make a copy of state
    const fieldsCopy =  [...fields];
    // make a copy of the field to change (arr[i])
    const fieldCopy = {...fieldsCopy[index]}
    // make change
    fieldCopy.display = !fieldsCopy[index].display;

    // now, setFields back by
    // 1. replace old field with new field
    fieldsCopy.splice(index, 1, fieldCopy);
    // 2. write to state
    setFields(fieldsCopy);

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