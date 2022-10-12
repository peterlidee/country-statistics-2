import PropTypes from 'prop-types';

function CountryCount(props){
  return(
    <div className="country-count">
      displaying <span className="country-count__number">{props.count}</span> {props.count == 1 ? 'country' : 'countries'}
    </div>
  )
}

CountryCount.propTypes = {
  count: PropTypes.number.isRequired,
}

export default CountryCount;