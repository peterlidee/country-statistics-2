import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import SettingsToggle from '../SettingsToggle'
import IconSettings from '../../svgSnippets/IconSettings'

jest.mock('../../svgSnippets/IconSettings')
const ChildMock = jest.fn()

describe('SettingsToggle', () => {

  test('It renders', () => {
    render(<SettingsToggle><ChildMock /></SettingsToggle>)
    expect(screen.getByRole('button', { name: /settings/i })).toBeInTheDocument()
    expect(IconSettings).toHaveBeenCalled()
    expect(ChildMock).toHaveBeenCalled()
  })

  test('It toggles on button press', async() => {
    const { container } = render(<SettingsToggle><ChildMock /></SettingsToggle>)
    const user = userEvent.setup()
    const button = screen.getByRole('button', { name: /settings/i })
    // eslint-disable-next-line testing-library/no-container, testing-library/no-node-access
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