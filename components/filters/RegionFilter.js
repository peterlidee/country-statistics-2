import { useContext, useState } from 'react';
import FilterContext from '../context/FilterContext';
import Collapse from './Collapse';

import PropTypes from 'prop-types';

function SubregionCollapse(props){
  const [ open, setOpen ] = useState(props.open);
  return(
    <div className="collapse collapse--subregion">
      <RegionFilterRow regionName={props.regionName}>
        <button className="collapse__controller collapse__controller--subregion" onClick={() => setOpen(!open)}>
          <span className="collapse__status">{open ? "-" : "+"}</span>
          <span className="collapse__label">{props.label}</span>
        </button>
      </RegionFilterRow>
      {open && 
        <div className="collapse__content">
          {props.children}
        </div>
      }
    </div>
  )
}
SubregionCollapse.propTypes = {
  regionName: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  open: PropTypes.bool.isRequired,
}

function RegionFilterRow(props){
  return(
    <div className="region-filter-row">
      --
      input 
      {props.regionName} 
      count
      {props.children}
      --
    </div>
  )
}
RegionFilterRow.propTypes = {
  regionName: PropTypes.string.isRequired,
}


function RegionFilter(props){

  const { regionFilter } = useContext(FilterContext);

  console.log('regionFilter',regionFilter)

  const allRegions = Object.keys(regionFilter).map(region => {
    <div className="region-filter-block">
      <div className="region-filter-row">input regionName count toggle</div>
      <div className="subregion-filter-block">
        <div className="subregion--filter-row">input subRegionName count</div>
      </div>
    </div>
  })

  return(
    <div className="filter__section filter__section--region">
      {Object.keys(regionFilter).map(regionName => {
        // if(regionFilter[region].subregionActive.length > 0){
        //   // display subregions
        // }
        // return <div key={`region-${region}`}>{region}</div>

        const hasSubregion = regionFilter[regionName].subregionNames.length > 0;

        if(!hasSubregion) return(
          <div className="region-filter-block" key={`region-filter-${regionName}`}>
            <RegionFilterRow regionName={regionName} />
          </div>
        )
      
        return(
          <div className="region-filter-block" key={`region-filter-${regionName}`}>
              <SubregionCollapse label="subregions" regionName={regionName} open={true}> 
              {/* todo set open to hasactive filter */}
              <div className="subregion-filter-block">
                {regionFilter[regionName].subregionNames.map(subregionName => {
                  return(
                    <div className="subregion--filter-row" key={`subregion-filter-${subregionName}`}>input {subregionName} count</div>
                  )
                })}
                <button>clear</button>
              </div>
              </SubregionCollapse>
          </div>
        )
      })}
    </div>
  )
}

export default RegionFilter;  