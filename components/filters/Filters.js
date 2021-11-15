import { useContext } from "react";
import FilterContext from "../context/FilterContext";
import TextFilter from "./TextFilter";
import NumberFilter from "./NumberFilter";

function Filters(props){
  console.log('rendering Filters',)

  const { filters, handleFilters, handleToggle } = useContext(FilterContext);
  return(
    <aside>
      filters go here
      {filters.map(filter => {
        if(filter.type == 'text') return <TextFilter filter={filter} handleFilters={handleFilters} handleToggle={handleToggle} />
        return <NumberFilter filter={filter} />
      })}
    </aside>
  )
}

export default Filters;