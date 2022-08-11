import { screen, render } from '@testing-library/react'
import { toBeInTheDocument } from '@testing-library/jest-dom'

import BreadCrumb from '../BreadCrumb'

describe('components/single/BreadCrumb', () => {
  test('It renders', () => {
    const { container } = render(<BreadCrumb countryName="Algeria" />)
    expect(container.querySelector('.breadcrumb')).toBeInTheDocument()
    expect(container.querySelector('.breadcrumb__home')).toBeInTheDocument()
    expect(screen.getByText('Algeria')).toBeInTheDocument()
  })
})