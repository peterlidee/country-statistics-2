import { useContext, useState } from 'react';
import RegionFilterContext from '../context/RegionFilterContext';
import Collapse from './Collapse';

import PropTypes from 'prop-types';
import FilterCheckBox from './FilterCheckbox';

// function SubregionCollapse(props){
//   const [ open, setOpen ] = useState(false);
//   const displayStyle = { 'display': open ? 'block' : 'none' }
//   return(
//     <div className="collapse collapse--subregion">
//       <RegionFilterRow regionName={props.regionName} count={props.count}>
//         <button className="collapse__controller collapse__controller--subregion" onClick={() => setOpen(!open)}>
//           <span className="collapse__status">{open ? "-" : "+"}</span>
//           <span className="collapse__label">{props.label}</span>
//         </button>
//       </RegionFilterRow>
//       <div className="collapse__content" style={displayStyle}>
//         {props.children}
//       </div>
//     </div>
//   )
// }
// SubregionCollapse.propTypes = {
//   regionName: PropTypes.string.isRequired,
//   label: PropTypes.string.isRequired,
//   count: PropTypes.number.isRequired,
// }

// function RegionFilterRow(props){
//   return(
//     <div className="region-filter-row">
//       <FilterCheckBox label={props.regionName} active={props.regionActive} />
//       <span>{props.count}</span>
//       {props.children}
//       --
//     </div>
//   )
// }
// RegionFilterRow.propTypes = {
//   regionName: PropTypes.string.isRequired,
//   count: PropTypes.number.isRequired,
//   regionActive: PropTypes.bool.isRequired,
// }

// function SubregionFilterRow(props){
//   return(
//     <div className="subregion-filter-row">
//       input 
//       {props.subregionName} 
//       <span>{props.count}</span>
//     </div>
//   )
// }
// SubregionFilterRow.propTypes = {
//   subregionName: PropTypes.string.isRequired,
//   count: PropTypes.number.isRequired,
// }

function RegionFilter(props){

  const { regionFilter, handleRegionFilter, handleSubregionFilter, handleRegionClear } = useContext(RegionFilterContext);
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

// function RegionFilter2(props){

//   const { regionFilter } = useContext(FilterContext);

//   return(
//     <div className="filter__section filter__section--region">
//       {Object.keys(regionFilter).map(regionName => {

//         const regionCount = props.regionIndexes[regionName].length;

//         const hasSubregion = regionFilter[regionName].subregionNames.length > 0;
//         if(!hasSubregion) return(
//           <div className="region-filter-block" key={`region-filter-${regionName}`}>
//             <RegionFilterRow regionName={regionName} regionActive={regionFilter[regionName].regionActive} count={regionCount} />
//           </div>
//         )

//         return(
//           <div className="region-filter-block" key={`region-filter-${regionName}`}>
//               <SubregionCollapse label="subregions" regionName={regionName} count={regionCount}> 
//               <div className="subregion-filter-block">
//                 {regionFilter[regionName].subregionNames.map(subregionName => 
//                   <SubregionFilterRow 
//                     key={`subregion-filter-${subregionName}`} 
//                     subregionName={subregionName} 
//                     count={props.regionIndexes[subregionName].length} 
//                   />
//                 )}
//                 <button>clear</button>
//               </div>
//               </SubregionCollapse>
//           </div>
//         )
//       })}
//     </div>
//   )
// }

RegionFilter.propTypes = {
  regionIndexes: PropTypes.object.isRequired,
}

export default RegionFilter;  