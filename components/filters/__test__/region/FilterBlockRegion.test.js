import { screen, render } from '@testing-library/react'
import { toBeInTheDocument } from '@testing-library/jest-dom'
import userEvent from '@testing-library/user-event'

import FilterBlockRegion from '../../region/FilterBlockRegion'
import FilterRow from '../../region/FilterRow'

jest.mock('../../region/FilterRow', () => {
  return jest.fn((props) => <div className="FilterRow">{props.children}</div>)
})
const ChildMock = jest.fn()

describe('components/filters/region/FilterBlockRegion', () => {
  test('It renders without subfilters', () => {
    const { container } = render(
      <FilterBlockRegion
          name="name"
          active={true}
          handler={() => {}}
          count={1}
          hasSubFilter={false}
        >
          <ChildMock />
        </FilterBlockRegion>
    )
    expect(container.querySelector('.filter__block__region')).toBeInTheDocument()
    expect(FilterRow).toHaveBeenCalledWith(
      expect.objectContaining({
        name: 'name', active: true, count: 1,
      }),
      expect.anything()
    )
    expect(screen.queryByRole('button', { name: /subregions/i })).not.toBeInTheDocument()
    expect(container.querySelector('.collapse__content')).not.toBeInTheDocument()
    expect(ChildMock).not.toHaveBeenCalled()
  })

  test('It renders with subfilters', () => {
    const { container } = render(
      <FilterBlockRegion
          name="name"
          active={true}
          handler={() => {}}
          count={1}
          hasSubFilter={true}
        >
          <ChildMock />
        </FilterBlockRegion>
    )
    const button = screen.queryByRole('button', { name: /subregions/i })
    expect(button).toBeInTheDocument()
    expect(container.querySelector('.collapse__content')).toBeInTheDocument()
    expect(ChildMock).toHaveBeenCalled()
  })

  test('It collapses', async() => {
    const { container } = render(
      <FilterBlockRegion
          name="name"
          active={true}
          handler={() => {}}
          count={1}
          hasSubFilter={true}
        >
          <ChildMock />
        </FilterBlockRegion>
    )
    const User = userEvent.setup()
    const button = screen.queryByRole('button', { name: /subregions/i })
    const content = container.querySelector('.collapse__content--subfilter')
    // check initial state
    expect(button).toHaveTextContent('+')
    expect(content).toHaveStyle('display: none')

    // click the button
    await User.click(button)

    expect(button).toHaveTextContent('-')
    expect(content).toHaveStyle('display: block')

    // some more clicks
    await User.click(button)
    await User.click(button)
    await User.click(button)

    expect(button).toHaveTextContent('+')
    expect(content).toHaveStyle('display: none')
  })

})