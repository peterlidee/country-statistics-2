import { render, screen, toHaveBeenCalled } from '@testing-library/react'
import { toBeInTheDocument, toHaveStyle } from '@testing-library/jest-dom'
import userEvent from '@testing-library/user-event'

import FieldSettings from '../FieldSettings'
import { FieldsContextProvider } from '../../context/FieldsContext'
import IconSettings from '../../svgSnippets/IconSettings'

jest.mock('../../svgSnippets/IconSettings')

const setupRender = () => {
  const { container } = render(
  <FieldsContextProvider>
    <FieldSettings />
  </FieldsContextProvider>
  )
  return {
    container,
    button: screen.getByRole('button'),
    collapse: container.querySelector('.settings__collapse')
  }
}

describe('components/header/FieldSettings', () => {
  
  test('It renders (closed)', () => {
    const { container, button, collapse } = setupRender()
    expect(container.querySelector('.settings')).toBeInTheDocument()
    expect(button).toBeInTheDocument()
    expect(IconSettings).toHaveBeenCalled()
    expect(collapse).toBeInTheDocument()
  })

  test('It toggles and renders correctly', async () => {
    // check the closed toggle
    const { container, button, collapse } = setupRender()
    expect(collapse).toHaveStyle('display: none')
    // open the toggle
    const user = userEvent.setup()
    await user.click(button)
    // check if all elements are there
    expect(container.querySelector('.settings__collapse')).toHaveStyle('display: block')
    expect(screen.getByText(/display columns:/i)).toBeInTheDocument()
    expect(screen.getAllByRole('checkbox')).toHaveLength(3)
    expect(screen.getByRole('checkbox', { name: /population/i })).toBeInTheDocument()
    expect(screen.getByRole('checkbox', { name: /area/i })).toBeInTheDocument()
    expect(screen.getByRole('checkbox', { name: /density/i })).toBeInTheDocument()
    // check if it closes correctly
    await user.click(button)
    expect(collapse).toHaveStyle('display: none')
  })

  test('It checks the boxes correctly', async () => {
    // open the toggle
    const user = userEvent.setup()
    const { button } = setupRender()
    await user.click(button)
    // get the checkboxes
    const checkbox1 = screen.getByRole('checkbox', { name: /population/i })
    const checkbox2 = screen.getByRole('checkbox', { name: /area/i })
    const checkbox3 = screen.getByRole('checkbox', { name: /density/i })
    // simulate clicks
    await user.click(checkbox1)
    expect(checkbox1).not.toBeChecked()
    await user.click(checkbox2)
    expect(checkbox1).not.toBeChecked()
    await user.click(checkbox3)
    expect(checkbox1).not.toBeChecked()
    // some extra clicks, just testing
    await user.click(checkbox1)
    expect(checkbox1).toBeChecked()
    await user.click(checkbox1)
    await user.click(checkbox1)
    await user.click(checkbox1)
    expect(checkbox1).not.toBeChecked()
  })
})
