import { useContext } from 'react';
import RegionFilterContext from '../context/RegionFilterContext';
import Collapse from './Collapse';

import PropTypes from 'prop-types';
import FilterCheckBox from './FilterCheckbox';

function RegionFilter(props){

  const { 
    regionFilter, 
    handleRegionFilter, 
    handleSubregionFilter, 
    handleRegionClear
  } = useContext(RegionFilterContext);

  return(
    <div className="filter-section">
      {Object.keys(regionFilter).map(regionName => (
          <div className="filter-section__region-block" key={`region-filter-${regionName}`}>
            {/* one block per region */}
            <div className="filter-section__row filter-section__row--region">
              <FilterCheckBox 
                label={regionName} 
                active={regionFilter[regionName].regionActive} 
                handler={() => handleRegionFilter(regionName)} 
              />
              <span>{props.regionIndexes[regionName].length}</span>
            </div>
            {/* if there are subregions */}
            {(regionFilter[regionName].subregionNames.length > 0) && 
              <Collapse label="show subregions">
                <div className="filter-section__subregion-block">
                  {/* one block for all the subregions */}
                  {regionFilter[regionName].subregionNames.map((subregionName, i) => (
                    <div className="filter-section__row filter-section__row--subregion" key={`subregion-filter-${subregionName}`}>
                      <FilterCheckBox 
                        label={subregionName} 
                        active={regionFilter[regionName].subregionActive[i]}
                        handler={() => handleSubregionFilter(regionName, i)} 
                      />
                      <span>{props.regionIndexes[subregionName].length}</span>
                    </div>
                  ))}
                </div>
              </Collapse>
            }
          {/* close filter-section__region-block */}
          </div>
        )
      )}
      <button onClick={handleRegionClear}>clear</button>
    </div>
  )
}

RegionFilter.propTypes = {
  regionIndexes: PropTypes.object.isRequired,
}

export default RegionFilter;  