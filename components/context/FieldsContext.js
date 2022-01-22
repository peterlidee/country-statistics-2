import React, { useReducer } from 'react';

// create context with default value
const FieldsContext = React.createContext({
  fields: [],
  dispatch: () => {},
})

// state is an array of 4 object: country, population, area and density
// each has properties to render them, to display them or not and to sort them
const initialState = [
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
];

function reducer(state, action){

  // make a copy of state 
  const stateCopy = [...state];
  // then, make a copy of the current item to alter (state[action.index])
  const fieldCopy = {...stateCopy[action.index]};

  switch (action.type){
    case 'display':
      // handle changes in fields being displayed or not
      // toggle state[action.index].display
      
      // make change
      fieldCopy.display = !stateCopy[action.index].display;
      // replace old field with new field
      stateCopy.splice(action.index, 1, fieldCopy);
      // return stateCopy as new state
      return stateCopy;
    
    case 'sort':
      // handle the sort settings
      // 2 options
      // 1. if current item (state[action.index]) sortActive, toggle sortAsc
      // 2. if current item (state[action.index]) !sortActive, toggle sortActive and reset all other fields to sortActive false

      // we code this in 2 other steps
      // A. first we set fieldCopy (the current item), to it's new values
      // B. we map over all other items and set those to sortActive:false and sortAsc:default

      // A. set fieldCopy
      // if it was previously active, flip the sortAsc value
      // else, set it to active and do nothing else (= use current value (should be default))
      if(fieldCopy.sortActive){
        fieldCopy.sortAsc = !fieldCopy.sortAsc
      }else{
        fieldCopy.sortActive = true;
      }

      // B. loop over all items in stateCopy
      // for all except the currrent one, reset them (isActive to false and sortAsc to default)
      const newState = stateCopy.map((field, i) => {
        if(i == action.index){
          return fieldCopy
        }
        return({
          ...field,
          sortActive: false,
          sortAsc: field.sortDefault
        })
      })
      
      // return new state
      return newState;

    default:
      return state;
  }
}

const FieldsContextProvider = props => {

  const [fields, dispatch] = useReducer(reducer, initialState);
  return(
      <FieldsContext.Provider value={{ 
        fields,
        dispatch,
      }}>
          {props.children}
      </FieldsContext.Provider>
  )
}

export default FieldsContext;
export { FieldsContextProvider };