import Collapse from './Collapse';

function SubRegionFilter(props){
  return(
    <Collapse label={props.filter.label}>
      the collapsed content
    </Collapse>
  )
}

export default SubRegionFilter;  