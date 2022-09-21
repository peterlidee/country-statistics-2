import { render, screen } from '@testing-library/react'
import { toBeInTheDocument } from '@testing-library/jest-dom'
import userEvent from '@testing-library/user-event'

import SettingsToggle from '../SettingsToggle'
import IconSettings from '../../svgSnippets/IconSettings'

jest.mock('../../svgSnippets/IconSettings')
const ChildMock = jest.fn()

describe('SettingsToggle', () => {
  test('It renders', () => {
    const { container } = render(<SettingsToggle><ChildMock /></SettingsToggle>)
    expect(container.querySelector('.settings')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'settings' })).toBeInTheDocument()
    expect(IconSettings).toHaveBeenCalled()
    expect(ChildMock).toHaveBeenCalled()
  })
  test('It toggles on button press', async() => {
    const { container } = render(<SettingsToggle><ChildMock /></SettingsToggle>)
    const user = userEvent.setup()
    const button = screen.getByRole('button', { name: /Settings/i })
    const collapse = container.querySelector('.settings__collapse')
    // it is initially closed
    expect(collapse).toHaveStyle('display:none')
    // it opens on click
    await user.click(button)
    expect(collapse).toHaveStyle('display:block')
    // test multiple clicks
    await user.click(button)
    await user.click(button)
    await user.click(button)
    expect(collapse).toHaveStyle('display:none')
  })
})