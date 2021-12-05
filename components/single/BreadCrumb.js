import Link from "next/link";

function BreadCrumb(props){
  return(
    <div className="breadcrumb">
      <Link href="/">
        <a className="breabcrumb__home">all countries</a>
      </Link>
      <span className="breadcrumb__divider">&gt;</span>
      {props.countryName || "..."}
    </div>
  )
}

export default BreadCrumb;