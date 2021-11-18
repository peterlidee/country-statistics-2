import RegionFilter from "./RegionFilter";
import NumberFilter from "./NumberFilter";
import Collapse from "./Collapse";

import PropTypes from 'prop-types';
import { RegionFilterContextProvider } from "../context/RegionFilterContext";

function Filters(props){
  console.log('rendering Filters',)
  const filters = ["region", "population", "area", "density" ];

  return(
    <aside>
      <h3>filter</h3>
      {filters.map((filter, i) =>
        <Collapse label={filter} key={`collapse-${filter}`}>
          {filter == "region" && 
            <RegionFilterContextProvider defaultRegionState={props.filterData.defaultRegionState}>
              <RegionFilter regionIndexes={props.filterData.regionIndexes} />
            </RegionFilterContextProvider>
          }
          {filter !== "region" && <NumberFilter filter={filter} />}
        </Collapse>
      )}
    </aside>
  )
}

export default Filters;