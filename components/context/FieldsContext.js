import React, { useState } from 'react';

// create context with default value
const FieldsContext = React.createContext({
    fields: [],
    handleDisplay: () => {},
    handleSort: () => {},
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
      sortActive: true,
      sortAsc: true,
      sortDefault: true,
      sortKey: 'countryName',
      sortType: 'text',
    },
    {
      field: 'population',
      label: 'Population',
      key: 'populationPrettyFormat',
      display: true,
      displayToggle: true,
      legend: 'Inhabitants',
      sortActive: false,
      sortAsc: false,
      sortDefault: false,
      sortKey: 'population',
      sortType: 'number',
    },
    {
      field: 'area',
      label: 'Area',
      key: 'areaPrettyFormat',
      display: true,
      displayToggle: true,
      legend: 'Km²',
      sortActive: false,
      sortAsc: true,
      sortDefault: false,
      sortKey: 'area',
      sortType: 'number',
    },
    {
      field: 'density',
      label: 'Density',
      key: 'densityPrettyFormat',
      display: true,
      displayToggle: true,
      legend: 'Inh./km²',
      sortActive: false,
      sortAsc: true,
      sortDefault: false,
      sortKey: 'density',
      sortType: 'number',
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

  // handle the sort settings
  // the sort buttons will return index
  const handleSort = (index) => {
    // copy state
    const fieldsCopy = [...fields];
    // get a copy of the field that is now active
    const fieldCopy = {...fieldsCopy[index]};

    // if it was previously active, flip the sortAsc value
    // else, use current value (should be default)
    if(fieldCopy.sortActive){
      fieldCopy.sortAsc = !fieldCopy.sortAsc
    }else{
      fieldCopy.sortActive = true;
    }

    const newFields = fields.map((field, i) => {
      if(i == index){
        return fieldCopy
      }
      return({
        ...fields[i],
        sortActive: false,
        sortAsc: fields[i].sortDefault
      })
    })

    // console.log('newFields',newFields)
    
    setFields(newFields);
    
    //console.log('field copy',fieldCopy)
    // deactivate the other fields and set them to default sortAsc

  }

  return(
      <FieldsContext.Provider value={{ 
        fields, 
        handleDisplay,
        handleSort,
      }}>
          {props.children}
      </FieldsContext.Provider>
  )
}

export default FieldsContext;
export { FieldsContextProvider };