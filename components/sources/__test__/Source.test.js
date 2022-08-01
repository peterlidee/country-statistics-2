import { screen, render } from '@testing-library/react'
import { toBeInTheDocument, toHaveClass } from '@testing-library/jest-dom'

import Source from '../Source'

const setupRender = (loading, error, label, endpoint) => {
  const { container } = render(
    <Source 
      loading={loading} 
      error={error} 
      label={label} 
      endpoint={endpoint} />
  )
  return({
    source: container.querySelector('.source'),
    icon: container.querySelector('.source__icon'),
    status: container.querySelector('.source__status'),
    nolink: container.querySelector('.source__nolink'),
    link: container.querySelector('.source__link'),
    errorMessage: container.querySelector('.source__errormessage'),
  })
}

test('components/sources/Source renders', () => {
  const elements = setupRender(false, undefined, 'label', undefined)
  expect(elements.source).toBeInTheDocument()
  expect(elements.icon).toBeInTheDocument()
  expect(elements.status).toBeInTheDocument()
})

describe('components/sources/Source icon and status elements', () => {
  test('Are correct when loading = false', () => {
    const { icon, status } = setupRender(false, undefined, 'label', undefined)
    expect(icon).toHaveClass('source__icon--loaded')
    expect(status).toHaveTextContent('loaded')
  })
  test('Are correct when loading = true', () => {
    const { icon, status } = setupRender(true, undefined, 'label', undefined)
    expect(icon).toHaveClass('source__icon--loading')
    expect(status).toHaveTextContent('loading')
  })
  test('Are correct when error', () => {
    const { icon, status } = setupRender(false, new Error('Error'), 'label', undefined)
    expect(icon).toHaveClass('source__icon--error')
    expect(status).toHaveTextContent('error')
  })
})

describe('components/sources/Source link and nolink elements', () => {
  test('It works correctly with no endpoint', () => {
    const { link, nolink } = setupRender(false, undefined, 'label', undefined)
    expect(nolink).toBeInTheDocument()
    expect(nolink).toHaveTextContent("label")
    expect(link).toBeNull()
  })
  test('It works correctly with an endpoint', () => {
    const { link, nolink } = setupRender(false, undefined, 'label', 'url')
    expect(nolink).toBeNull()
    expect(link).toBeInTheDocument()
    expect(link).toHaveTextContent("label")
    expect(link).toHaveAttribute('href', 'url')
  })
})

describe('components/sources/Source errors', () => {
  it('It shows an error when error.message', () => {
    const error = new Error('Error test')
    const { errorMessage } = setupRender(false, error, 'label', undefined)
    expect(errorMessage).toHaveTextContent('Error test')
  })
  it('It does not show error when error but no error.message', () => {
    const error = new Error()
    const { errorMessage } = setupRender(false, error, 'label', undefined)
    expect(errorMessage).toBeNull()
  })
  it('It does not show error when no error', () => {
    const { errorMessage } = setupRender(false, undefined, 'label', undefined)
    expect(errorMessage).toBeNull()
  })
})