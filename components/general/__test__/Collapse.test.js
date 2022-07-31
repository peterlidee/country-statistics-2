import { screen, render } from '@testing-library/react'
import { toBeInTheDocument } from '@testing-library/jest-dom'
import userEvent from '@testing-library/user-event'

import Collapse from '../Collapse'
import Wrapper from '../Wrapper'

const elements = {}

beforeEach(() => {
  const { container } = render(<Collapse label="label" extraClass="" />)
  elements.wrapper = screen.getByTestId('Wrapper')
  elements.button = screen.getByRole('button')
  elements.content = container.querySelector('.collapse__content')
  elements.buttonLabelEl = elements.button.querySelector('.collapse__label')
  elements.buttonStatusEl = elements.button.querySelector('.collapse__status')
})

jest.mock('../Wrapper', () => {
  return jest.fn((props) => <div data-testid="Wrapper">{props.children}</div>)
})

describe('components/general/Collapse renders', () => {
  test('It renders the wrapper mock and its children', () => {
    expect(Wrapper).toHaveBeenCalled()
    expect(elements.wrapper).toBeInTheDocument()
  })
  test('It renders content container and button', () => {
    expect(elements.content).toBeInTheDocument()
    expect(elements.button).toBeInTheDocument()
  })
  test('The button has the correct label', () => {
    expect(elements.buttonLabelEl).toHaveTextContent('label')
  })
})

describe('components/general/Collapse works correctly', () => {
  test('It has the correct initial values', () => {
    expect(elements.buttonStatusEl).toHaveTextContent('+')
    expect(elements.content).toHaveStyle('display: none')
  })
  test('It toggles', async () => {
    const user = userEvent.setup()
    await user.click(elements.button)
    expect(elements.buttonStatusEl).toHaveTextContent('-')
    expect(elements.content).toHaveStyle('display: block')
  })
  test('It toggles many times', async () => {
    const user = userEvent.setup()
    await user.click(elements.button)
    await user.click(elements.button)
    await user.click(elements.button)
    expect(elements.buttonStatusEl).toHaveTextContent('-')
    expect(elements.content).toHaveStyle('display: block')
    await user.click(elements.button)
    expect(elements.buttonStatusEl).toHaveTextContent('+')
    expect(elements.content).toHaveStyle('display: none')
  })
})