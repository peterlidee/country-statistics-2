import { screen, render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import FilterBlockRegion from '../../region/FilterBlockRegion'
import FilterRow from '../../region/FilterRow'

jest.mock('../../region/FilterRow', () => {
  return jest.fn((props) => <>{props.children}</>)
})
const ChildMock = jest.fn()

describe('components/filters/region/FilterBlockRegion', () => {

  test('It renders without subfilters', () => {
    render(
      <FilterBlockRegion
          name="name"
          region={undefined}
          activeRegions={[]}
          count={1}
          hasSubFilter={false}
        >
          <ChildMock />
        </FilterBlockRegion>
    )
    expect(FilterRow).toHaveBeenCalledWith(
      expect.objectContaining({
        name: 'name', region: undefined, activeRegions: [], count: 1,
      }),
      expect.anything()
    )
    expect(screen.queryByRole('button', { name: /subregions/i })).not.toBeInTheDocument()
    expect(ChildMock).not.toHaveBeenCalled()
  })

  test('It renders with subfilters', () => {
    render(
      <FilterBlockRegion
          name="name"
          region={undefined}
          activeRegions={[]}
          count={1}
          hasSubFilter={true}
        >
          <ChildMock />
        </FilterBlockRegion>
    )
    const button = screen.queryByRole('button', { name: /subregions/i })
    expect(button).toBeInTheDocument()
    expect(ChildMock).toHaveBeenCalled()
  })

  test('It collapses', async() => {
    const { container } = render(
      <FilterBlockRegion
          name="name"
          region={undefined}
          activeRegions={[]}
          count={1}
          hasSubFilter={true}
        >
          <ChildMock />
        </FilterBlockRegion>
    )
    const User = userEvent.setup()
    const button = screen.queryByRole('button', { name: /subregions/i })
    // eslint-disable-next-line testing-library/no-container, testing-library/no-node-access
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