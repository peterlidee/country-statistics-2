import { screen, render } from '@testing-library/react'
import { toBeInTheDocument } from '@testing-library/jest-dom'

import SingleCountryFetch from '../SingleCountryFetch'
import useFetch from 'react-fetch-hook'
import Sources from '../../sources/Sources'
import Source from '../../sources/Source'

jest.mock('react-fetch-hook');
jest.mock('../../sources/Sources', () => {
  return jest.fn((props) => <>{props.children}</>)
})
jest.mock('../../sources/Source')

const ChildMock = jest.fn()

describe('components/single/SingleCountryFetch', () => {
  test('It renders', async () => {
    const isLoading = false
    const error = undefined
    const data = []
    useFetch.mockReturnValue({ isLoading, error, data })
    const { container } = render(
      <SingleCountryFetch
        label='label'
        endpoint='endpoint'
        extraClass="extraClass"
        showSource={true}>
        {() => <ChildMock />}
      </SingleCountryFetch>
    )
    expect(container.querySelector('.single-country__extraClass')).toBeInTheDocument()
    expect(ChildMock).toHaveBeenCalled()
    expect(Sources).toHaveBeenCalled()
    expect(Source).toHaveBeenCalledWith(
      expect.objectContaining({
        error: false,
        loading: false,
        endpoint: 'endpoint',
        label: 'label',
      }),
      expect.anything()
    )
  })
})