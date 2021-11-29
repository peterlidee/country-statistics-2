import RegionFilter from "./region/RegionFilter";
import NumberFilter from "./number/NumberFilter";
import Collapse from "../general/Collapse";

import PropTypes from 'prop-types';
import { useContext, useState } from "react";
import FieldsContext from "../context/FieldsContext";

function Filters(props){
  // TODO: remove cl
  console.log('rendering Filters',)
  const filters = ["region"];
  const filtersToCheckForDisplay = [ "population", "area", "density" ];
  
  const { fields } = useContext(FieldsContext);
  
  // check if the field / filter is to be displayed
  for(let i = 0 ; i < filtersToCheckForDisplay.length; i++){
    const currFilter = fields.filter(field => {
      if(field.field == filtersToCheckForDisplay[i]) return field; 
    })
    if(currFilter[0].display) filters.push(filtersToCheckForDisplay[i])
  }

  const [ toggle, setToggle ] = useState(false);
  const toggleClass = toggle ? 'filters filters--open' : 'filters filters--closed';

  return(
    <aside className="site__filters">
      <h3 className="filters__title">filter</h3>
      <button className="filters__toggler" onClick={() => setToggle(!toggle)}>filter</button>
      <div className={toggleClass}>
        {filters.map((filter, i) =>
          <Collapse label={filter} key={`collapse-${filter}`} extraClass="filter">
            {filter == "region" && <RegionFilter regionIndexes={props.filterData.regionIndexes} />}
            {filter !== "region" && <NumberFilter filter={filter} currFilterData={props.filterData[filter]} />}
          </Collapse>
        )}
      </div>
    </aside>
  )
}

Filters.propTypes = {
  filterData: PropTypes.object.isRequired,
}

export default Filters;