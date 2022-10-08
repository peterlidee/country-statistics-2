import { useContext } from 'react'
import { useRouter } from 'next/router'
import PropTypes from 'prop-types'
import RegionFilterContext from '../../context/RegionFilterContext'

import updateRegionsQuery from '../../../lib/regionFilter/updateRegionsQuery'

function FilterCheckBox(props){
  
  const { regionsAndSubregions } = useContext(RegionFilterContext)
  const router = useRouter()
  const isActive = props.activeRegions.includes(props.name)

  const handler = () => {

    // 1. if a subregion is clicked
    // 1.1 if the subregion is active
    // 1.1.1 if the region is active -> deactivate region and subregion (all other subregion should be active)
    // 1.1.2 if the region is not active -> deactivate subregion
    // 1.2 if the subregion is not active
    // 1.2.1 if all other subregions in this region are active -> activate subregion and region
    // 1.2.2 if not all other subregions in this region are active -> activate subregion
    // 2. if a region is clicked
    // 2.1 if the region is active -> deactivate region and all subregions
    // 2.2 if the region is not active -> activate region and all subregions

    let toAdd = []
    let toRemove = []
    
    if(props.region){ // 1. subregion is clicked
      if(isActive){ // 1.1 subregion active
        if(props.activeRegions.includes(props.region)){
          // 1.1.1 if the region is active -> deactivate region and subregion
          // toAdd = []
          toRemove = [ props.name, props.region ]
        }else{
          // 1.1.2 if the region is not active -> deactivate subregion
          // toAdd = []
          toRemove = [ props.name ]
        }
      }else{ // 1.2 subregion not active
        const allOtherSubregions = regionsAndSubregions[props.region].subregionNames.filter(item => item !== props.name)
        const allOtherSubregionsActive = allOtherSubregions.every(subregion => props.activeRegions.includes(subregion))
        if(allOtherSubregionsActive){
          // 1.2.1 if all other subregions in this region are active -> activate subregion and region
          toAdd = [ props.region, props.name ]
          // toRemove = []
        }else{
          // 1.2.2 if not all other subregions in this region are active -> activate subregion
          toAdd = [ props.name ]
          // toRemove = []
        }
      }
    }else{ // 2. region is clicked
      if(isActive){
        // 2.1 if the region is active -> deactivate region and all subregions
        // toAdd = []
        toRemove = [ props.name, ...regionsAndSubregions[props.name].subregionNames ]
      }else{
        // 2.2 if the region is not active -> activate region and all subregions
        toAdd = [ props.name, ...regionsAndSubregions[props.name].subregionNames ]
        // toRemove = []
      }
    }
    const newRegionsQuery = updateRegionsQuery(props.activeRegions, toAdd, toRemove)

    router.push({
      path: '/',
      query: {
        ...router.query,
        regions: newRegionsQuery.join(',')
      }
    }, undefined, { shallow: true })
  }

  return(
    <>
      <label className="filtercheckbox__label">
        <input type="checkbox" className="filtercheckbox__input" value={""} checked={isActive} onChange={handler} />
        {props.name}
      </label>
    </>
  )
}

FilterCheckBox.propTypes = {
  name: PropTypes.string.isRequired,
  activeRegions: PropTypes.array.isRequired,
  // region can be undefined or String
}

export default FilterCheckBox;