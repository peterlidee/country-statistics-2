import Link from "next/link";
import PropTypes from "prop-types";

const BreadCrumb = (props) => (
  <div className="breadcrumb">
    <Link href="/">
      <a className="breabcrumb__home">all countries</a>
    </Link>
    <span className="breadcrumb__divider">&gt;</span>
    {props.countryName}
  </div>
)

BreadCrumb.propTypes = {
  countryName: PropTypes.string.isRequired
}

export default BreadCrumb;