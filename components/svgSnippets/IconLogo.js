function IconLogo(){
  return(
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 90" width="50px" height="40px" className="icon__logo">
      <g className="logo-globe">
        <path d="M40,90.92a40,40,0,1,1,0-80v80Z" transform="translate(0 -5)" fill="#65b1ef"/>
        <path d="M41,90.92c-11,0-21-17.91-21-40s10-40,21-40" transform="translate(0 -5)" fill="none" stroke="#f9f9f9" strokeMiterlimit="10" strokeWidth="4"/>
        <rect y="31" width="42" height="4" fill="#f9f9f9"/>
        <rect y="55" width="42" height="4" fill="#f9f9f9"/>
      </g>
      <rect x="44" width="8" height="90" fill="#222" className="logo-divider"/>
      <rect x="56" y="23" width="36" height="8" fill="#666" className="logo--graph"/>
      <rect x="56" y="35" width="44" height="8" fill="#666" className="logo--graph"/>
      <rect x="56" y="47" width="30" height="8" fill="#666" className="logo--graph"/>
      <rect x="56" y="59" width="37" height="8" fill="#666" className="logo--graph"/>
    </svg>
  );
}

export default IconLogo;