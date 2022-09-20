const fieldsData = [
  {
    slug: 'country',
    label: 'Country',
    sortAscDefault: true,
    sortKey: 'countryName',
    sortType: 'text',
    /*
    key: 'countryName',
    display: true,
    displayToggle: false,
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
    /*
    key: 'populationPrettyFormat',
    display: true,
    displayToggle: true,
    legend: 'Inhabitants',
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
    /*key: 'areaPrettyFormat',
    display: true,
    displayToggle: true,
    legend: 'Km²',
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
    /*key: 'densityPrettyFormat',
    display: true,
    displayToggle: true,
    legend: 'Inh./km²',
    sortActive: false,
    sortAsc: true,
    sortDefault: false,
    */
  },
]

export default fieldsData