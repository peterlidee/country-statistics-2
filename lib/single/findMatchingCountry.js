// helper function to filter out the matching country
const findMatchingCountry = (border, countries) => countries.filter(country => country.cca3 == border)

export default findMatchingCountry