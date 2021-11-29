import { useContext } from 'react';
import RegionFilterContext from '../../context/RegionFilterContext';
import FilterBlockRegion from './FilterBlockRegion';
import FilterRow from './FilterRow';
import PropTypes from 'prop-types';

function RegionFilter(props){

  const { 
    regionFilter, 
    handleRegionFilter, 
    handleSubregionFilter, 
    handleRegionClear
  } = useContext(RegionFilterContext);

  return(
    <div className="filter filter--region">
      {Object.keys(regionFilter).map(regionName => (
        <FilterBlockRegion
          key={`region-filter-${regionName}`}
          name={regionName} 
          active={regionFilter[regionName].regionActive} 
          handler={() => handleRegionFilter(regionName)}
          count={props.regionIndexes[regionName].length}
          hasSubFilter={regionFilter[regionName].subregionNames.length > 0}
        >
          {(regionFilter[regionName].subregionNames.length > 0) && 
            <div className="filter__block__subregion">
              {/* one block for all the subregions */}
              {regionFilter[regionName].subregionNames.map((subregionName, i) => (
                <FilterRow 
                  key={`subregion-filter-${subregionName}`}
                  name={subregionName} 
                  active={regionFilter[regionName].subregionActive[i]} 
                  handler={() => handleSubregionFilter(regionName, i)} 
                  count={props.regionIndexes[subregionName].length} 
                />
              ))}
            </div>
          }
        </FilterBlockRegion>
        )
      )}
      <button onClick={handleRegionClear} className="filter__clear-button">clear</button>
    </div>
  )
}

RegionFilter.propTypes = {
  regionIndexes: PropTypes.object.isRequired,
}

export default RegionFilter;  