import Link from 'next/link';
import IconLogo from '../svgSnippets/IconLogo';
import FieldSettings from './FieldSettings'

function Header(props){
  return(
    <header className="site__header">
      <Link href="/">
        <a className="site__logo" >
          <IconLogo />
          <div className="site__title">country statistics</div>
        </a>
      </Link>
      {props.home && <FieldSettings />}
    </header>
  )
}

Header.defaultProps = {
  home: false,
}

export default Header;