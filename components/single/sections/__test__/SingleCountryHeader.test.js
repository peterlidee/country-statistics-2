import { screen, render } from '@testing-library/react'
import { toBeInTheDocument } from '@testing-library/jest-dom'

import SingleCountryHeader from '../SingleCountryHeader'

const ChildMock = jest.fn()

describe('components/single/sections/SingleCountryHeader', () => {
  test('It renders', () => {
    const { container } = render(
      <SingleCountryHeader countryName='Algeria'>
        <ChildMock />
      </SingleCountryHeader>
    )
    expect(container.querySelector('.single-country__header')).toBeInTheDocument()
    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Algeria')
    expect(ChildMock).toHaveBeenCalled()
  })
})