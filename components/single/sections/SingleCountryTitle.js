import PropTypes from 'prop-types';

const SingleCountryTitle = ({ countryName }) => (
  <div className="single-country__title">
    <h1>{countryName}</h1>
  </div>
)

SingleCountryTitle.propTypes = {
  countryName: PropTypes.string.isRequired,
}

export default SingleCountryTitle;