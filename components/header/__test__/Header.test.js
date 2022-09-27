import { render, screen } from '@testing-library/react'
import { toBeInTheDocument } from '@testing-library/jest-dom'

import Header from '../Header'
import IconLogo from '../../svgSnippets/IconLogo'
import SettingsToggle from '../SettingsToggle'
import SettingsOptions from '../SettingsOptions'

jest.mock('../../svgSnippets/IconLogo')
jest.mock('../SettingsToggle', () => {
  return jest.fn((props) => props.children)
})
jest.mock('../SettingsOptions')

describe('components/header/Header', () => {

  test('It renders', () => {
    const { container } = render(<Header />)
    expect(container.querySelector('header')).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /country statistics/i })).toBeInTheDocument()
    expect(IconLogo).toHaveBeenCalled()
  })

  test('It renders settings mocks when home prop true', () => {
    render(<Header home={true} />)
    expect(SettingsToggle).toHaveBeenCalled()
    expect(SettingsOptions).toHaveBeenCalled()
  })

})