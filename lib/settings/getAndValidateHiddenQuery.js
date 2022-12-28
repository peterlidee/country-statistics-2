import fieldsData from "../../components/fields/fieldsData";
import getParameterFromQuery from "../query/getParameterFromQuery";

export default function getAndValidateHiddenQuery(routerQuery){
  // 1. get the values from query
  const values = getParameterFromQuery('hide', routerQuery)
  // 2. get all valid filters
  const validFilters = fieldsData
    .filter(field => field.displayToggle)
    .map(field => field.slug)
  // 3. validate the values against validFilters
  return values.filter(value => validFilters.includes(value))
}