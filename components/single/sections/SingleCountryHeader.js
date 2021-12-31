import PropTypes from 'prop-types';

const SingleCountryTitle = (props) => (
  <div className="single-country__header">
    <div className="single-country__box">
      <h1 className="single-country__title">{props.countryName}</h1>
    </div>
    {props.children}
  </div>
)

SingleCountryTitle.propTypes = {
  countryName: PropTypes.string.isRequired,
}

export default SingleCountryTitle;