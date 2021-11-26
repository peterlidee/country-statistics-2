import RegionFilter from "./region/RegionFilter";
import NumberFilter from "./NumberFilter";
import Collapse from "../general/Collapse";

import PropTypes from 'prop-types';
import { RegionFilterContextProvider } from "../context/RegionFilterContext";
import { NumberFiltersContextProvider } from "../context/NumberFiltersContext";

function Filters(props){
  // TODO: remove cl
  console.log('rendering Filters',)
  const filters = ["region", "population", "area", "density" ];

  return(
    <NumberFiltersContextProvider filterData={props.filterData}>
      <aside className="filters">
        <h3>filter</h3>
        {filters.map((filter, i) =>
          <Collapse label={filter} key={`collapse-${filter}`} extraClass="filter">
            {filter == "region" && 
              <RegionFilterContextProvider defaultRegionState={props.filterData.defaultRegionState}>
                <RegionFilter regionIndexes={props.filterData.regionIndexes} />
              </RegionFilterContextProvider>
            }
            {filter !== "region" && <NumberFilter filter={filter} currFilterData={props.filterData[filter]} />
            }
          </Collapse>
        )}
      </aside>
    </NumberFiltersContextProvider>
  )
}

Filters.propTypes = {
  filterData: PropTypes.object.isRequired,
}

export default Filters;