import Collapse from './Collapse';

function RegionFilter(props){
  return(
    <Collapse label={props.filter.label}>
      the collapsed content
    </Collapse>
  )
}

export default RegionFilter;  