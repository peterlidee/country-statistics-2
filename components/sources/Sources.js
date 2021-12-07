function Sources(props){
  const containerClass = props.extraClass ? `source__container source__container--${props.extraClass}` : "source__container";
  return(
    <div className={containerClass}>
      <h4 className="source__title">source</h4>
      {props.children}
    </div>
  )
}

Sources.defaultProps = {
  extraClass: '',
}

export default Sources;