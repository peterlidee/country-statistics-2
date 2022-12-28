import getParameterFromQuery from '../query/getParameterFromQuery'

export default function getRegionsQuery(routerQuery){
  return getParameterFromQuery('regions', routerQuery)
}