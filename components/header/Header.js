import FieldSettings from '../display/FieldSettings'

function Header(props){
  return(
    <header className="site__header">
      header
      {props.home && <FieldSettings />}
    </header>
  )
}

Header.defaultProps = {
  home: false,
}

export default Header;