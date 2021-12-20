export default function Placeholder(props){
  const svgClass = props.place ? `svg-placeholder svg-placeholder--${props.place}` : "svg-placeholder";
  return(
    <svg xmlns="http://www.w3.org/2000/svg" width="30px" height="20px" viewBox="0 0 30 20" className={`svg-placeholder ${props.extraClass && props.extraClass}`}>
      <rect x="0" y="0" width="30" height="20" fill="#fff" />
    </svg>
  )
}