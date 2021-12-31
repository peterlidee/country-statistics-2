import PropTypes from "prop-types";

const BoxWrapper = (props) => (
  <div className={`single-country__${props.name}`}>
    <div className="single-country__box">
      {props.children}
    </div>
  </div>
)

BoxWrapper.propTypes = {
  name: PropTypes.string.isRequired
}

export default BoxWrapper;