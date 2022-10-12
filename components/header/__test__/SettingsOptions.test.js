import { screen, render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import { useRouter } from 'next/router'
import SettingsOptions from '../SettingsOptions'

jest.mock('next/router', () => ({
  useRouter: jest.fn()}
))

describe('SettingsOptions', () => {

  test('It renders with no query on the router', () => {
    useRouter.mockReturnValue({ query: {}, push: () => {}})
    render(<SettingsOptions />)
    expect(useRouter).toHaveBeenCalled()
    expect(screen.getByText(/display columns:/i)).toBeInTheDocument()
    const checkboxes = screen.getAllByRole('checkbox')
    expect(checkboxes).toHaveLength(3)
    expect(checkboxes[0]).toBeChecked()
    expect(checkboxes[1]).toBeChecked()
    expect(checkboxes[2]).toBeChecked()
  })
  
  test('It renders with router.query.hide = population', () => {
    useRouter.mockReturnValue({ query: { hide: 'population' }, push: () => {}})
    render(<SettingsOptions />)
    const checkBoxPopulation = screen.getByRole('checkbox', { name: /population/i })
    const checkBoxArea = screen.getByRole('checkbox', { name: /area/i })
    const checkBoxDensity = screen.getByRole('checkbox', { name: /density/i })
    expect(checkBoxPopulation).not.toBeChecked()
    expect(checkBoxArea).toBeChecked()
    expect(checkBoxDensity).toBeChecked()
  })

  test('It renders with router.query.hide = population,area', () => {
    useRouter.mockReturnValue({ query: { hide: 'population,area' }, push: () => {}})
    render(<SettingsOptions />)
    const checkBoxPopulation = screen.getByRole('checkbox', { name: /population/i })
    const checkBoxArea = screen.getByRole('checkbox', { name: /area/i })
    const checkBoxDensity = screen.getByRole('checkbox', { name: /density/i })
    expect(checkBoxPopulation).not.toBeChecked()
    expect(checkBoxArea).not.toBeChecked()
    expect(checkBoxDensity).toBeChecked()
  })

  test('It renders with router.query.hide = population,area,density', () => {
    useRouter.mockReturnValue({ query: { hide: 'population,area,density' }, push: () => {}})
    render(<SettingsOptions />)
    const checkBoxPopulation = screen.getByRole('checkbox', { name: /population/i })
    const checkBoxArea = screen.getByRole('checkbox', { name: /area/i })
    const checkBoxDensity = screen.getByRole('checkbox', { name: /density/i })
    expect(checkBoxPopulation).not.toBeChecked()
    expect(checkBoxArea).not.toBeChecked()
    expect(checkBoxDensity).not.toBeChecked()
  })

  test('It calls router.push with the correct query', async() => {
    const pushMock = jest.fn()
    useRouter.mockReturnValue({ query: { hide: 'population' }, push: pushMock})
    render(<SettingsOptions />)
    const user = userEvent.setup()

    const checkBoxPopulation = screen.getByRole('checkbox', { name: /population/i })
    const checkBoxArea = screen.getByRole('checkbox', { name: /area/i })

    await user.click(checkBoxArea)
    expect(pushMock).toHaveBeenCalled()
    // test the query
    expect(pushMock).toHaveBeenCalledWith(
      expect.objectContaining({
        query: { hide: 'population,area' }
      }),
      undefined,
      { shallow: true }
    )

    await user.click(checkBoxPopulation)
    expect(pushMock).toHaveBeenCalled()
    // test the query
    expect(pushMock).toHaveBeenCalledWith(
      expect.objectContaining({
        query: { hide: '' }
      }),
      undefined,
      { shallow: true }
    )
  })
})