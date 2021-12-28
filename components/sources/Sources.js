function Sources(props){

  const base = 'source__container';
  const topBorder = props.topBorder ? `${base}--topBorder` : '';
  const extraClass = props.extraClass ? `${base}--${props.extraClass}` : '';
  
  return(
    <div className={`${base} ${topBorder} ${extraClass}`}>
      {props.children}
    </div>
  )
}

Sources.defaultProps = {
  extraClass: '',
  topBorder: false,
}

export default Sources;