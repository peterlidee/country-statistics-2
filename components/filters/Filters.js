import { useContext } from "react";
import FilterContext from "../context/FilterContext";
import TextFilter from "./TextFilter";
import RegionFilter from "./RegionFilter";
import SubRegionFilter from "./SubRegionFilter";
import NumberFilter from "./NumberFilter";
import Collapse from "./Collapse";

function Filter(props){
  if(props.filter.name == 'region') return <RegionFilter {...props} />
  if(props.filter.name == 'subregion') return <SubRegionFilter {...props} />
  return <NumberFilter {...props} />
}

function Filters(props){
  console.log('rendering Filters',)

  const { filters, handleFilters, regions } = useContext(FilterContext);

  return(
    <aside>
      <h3>filter</h3>
      {filters.map((filter, i) =>
        <Collapse label={filter.label} key={`filter-${filter.name}`}>
          <Filter filter={filter} handleFilters={handleFilters} /> 
        </Collapse>
      )}
    </aside>
  )
}

export default Filters;