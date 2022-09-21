// field display option fields and title

import { useRouter } from 'next/router'
import fieldsData from '../fields/fieldsData'

function FieldSettings() {

  // we won't wait for router.isReady because this component is inside settingsToggle and will be collapsed on first pageload
  const router = useRouter()

  // if there is hide prop on query and it has items, return array of items, else empy array
  const fieldsHidden = router.query.hide && router.query.hide.split(',').length > 0 ? router.query.hide.split(',') : []

  // handle inputclick
  const handleChange = (fieldSlug) => {

    // if the fieldSlug is in fieldsHidden, remove it, else add it
    const newFieldsHidden = fieldsHidden.includes(fieldSlug) ?
      fieldsHidden.filter(field => field !== fieldSlug) :
      [...fieldsHidden, fieldSlug]

    // make shallow push with new hidden array
    router.push({
      pathname: '/',
      query: { ...router.query, hide: newFieldsHidden.join(',')}
    }, undefined, { shallow: true })
  }

  return(
    <>
      <div className="settings__title">display columns:</div>
      {fieldsData.map(field => {
        if (!field.displayToggle) return null;
        return (
          <div key={`fieldsetting-${field.slug}`}>
            <input
              type="checkbox"
              value={field.slug}
              checked={!fieldsHidden.includes(field.slug)}
              onChange={() => handleChange(field.slug)}
              id={`fieldsetting-${field.slug}`}
              className="settings__checkbox"
            />
            <label htmlFor={`fieldsetting-${field.slug}`}>
              {field.label}
            </label>
          </div>
        )
      })}
    </>
  )
}

export default FieldSettings;