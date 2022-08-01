import { render, screen, toHaveBeenCalled } from '@testing-library/react'
import { toBeInTheDocument } from '@testing-library/jest-dom'

import Header from '../Header'
import IconLogo from '../../svgSnippets/IconLogo'
import FieldSettings from '../FieldSettings'

jest.mock('../../svgSnippets/IconLogo')
jest.mock('../FieldSettings')

describe('components/header/Header', () => {
  test('It renders', () => {
    const { container } = render(<Header />)
    expect(container.querySelector('header')).toBeInTheDocument()
    expect(IconLogo).toHaveBeenCalled()
  })
  test('It renders FieldSettings mock when home prop true', () => {
    render(<Header home={true} />)
    expect(FieldSettings).toHaveBeenCalled()
  })
})