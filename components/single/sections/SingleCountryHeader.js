import PropTypes from 'prop-types';

const SingleCountryHeader = (props) => (
  <div className="single-country__header">
    <h1 className="single-country__title">{props.countryName}</h1>
    {props.children}
  </div>
)

SingleCountryHeader.propTypes = {
  countryName: PropTypes.string.isRequired,
}

export default SingleCountryHeader;