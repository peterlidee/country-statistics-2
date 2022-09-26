const fieldsData = [
  {
    slug: 'country',
    label: 'Country',
    sortAscDefault: true,
    sortKey: 'countryName',
    sortType: 'text',
    displayToggle: false,
    legend: '',
    /*
    key: 'countryName',
    display: true,
    sortActive: true,
    sortAsc: true,
    sortDefault: true,
    */
  },
  {
    slug: 'population',
    label: 'Population',
    sortAscDefault: false,
    sortKey: 'population',
    sortType: 'number',
    legend: 'Inhabitants',
    displayToggle: true,
    /*
    key: 'populationPrettyFormat',
    display: true,
    sortActive: false,
    sortAsc: false,
    sortDefault: false,
    */
  },
  {
    slug: 'area',
    label: 'Area',
    sortAscDefault: false,
    sortKey: 'area',
    sortType: 'number',
    legend: 'Km²',
    displayToggle: true,
    /*key: 'areaPrettyFormat',
    display: true,
    sortActive: false,
    sortAsc: true,
    sortDefault: false,
    */
  },
  {
    slug: 'density',
    label: 'Density',
    sortAscDefault: false,
    sortKey: 'density',
    sortType: 'number',
    legend: 'Inh./km²',
    displayToggle: true,
    /*key: 'densityPrettyFormat',
    display: true,
    sortActive: false,
    sortAsc: true,
    sortDefault: false,
    */
  },
]

export default fieldsData