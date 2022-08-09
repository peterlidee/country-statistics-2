import { render, screen } from '@testing-library/react'
import { toHaveStyle } from '@testing-library/jest-dom'
import userEvent from '@testing-library/user-event'

import { RegionFilterContextProvider } from '../../../context/RegionFilterContext'
import { FieldsContextProvider } from '../../../context/FieldsContext'
import filterDataMock from '../../../../__mock__/data/filterDataMock'
import RegionFilter from '../../region/RegionFilter'

describe('Testing functionality of RegionFilter, FilterRow, FilterBlockRegion, FilterCheckBox', () => {
  test('It functions correctly', async () => {
    const User = userEvent.setup()
    const { container } = render(
      <FieldsContextProvider>
        <RegionFilterContextProvider
          defaultRegionState={filterDataMock.defaultRegionState}
        >
          <RegionFilter regionIndexes={filterDataMock.regionIndexes} />
        </RegionFilterContextProvider>
      </FieldsContextProvider>
    )
    
    const subregionCollapseButtons = screen.queryAllByRole('button', { name: /subregion/i })
    const subregionCollapseContent = container.querySelectorAll('.collapse__content--subfilter')
    
    // 1. open subregions for europe
    await User.click(subregionCollapseButtons[2])
    expect(subregionCollapseContent[2]).toHaveStyle('display: block')

    const checkboxEurope = screen.getByRole('checkbox', { name: "Europe" })
    const checkboxNE = screen.getByRole('checkbox', { name: /Northern Europe/i })
    const checkboxCE = screen.getByRole('checkbox', { name: /Central Europe/i })
    const checkboxWE = screen.getByRole('checkbox', { name: /Western Europe/i })
    
    // 2. select northern europe
    await User.click(checkboxNE)
    expect(checkboxNE).toBeChecked()
    expect(checkboxCE).not.toBeChecked()
    expect(checkboxWE).not.toBeChecked()
    expect(checkboxEurope).not.toBeChecked()

    // 3. select central europe
    await User.click(checkboxCE)
    expect(checkboxNE).toBeChecked()
    expect(checkboxCE).toBeChecked()
    expect(checkboxWE).not.toBeChecked()
    expect(checkboxEurope).not.toBeChecked()

    // 3. select western europe
    await User.click(checkboxWE)
    expect(checkboxNE).toBeChecked()
    expect(checkboxCE).toBeChecked()
    expect(checkboxWE).toBeChecked()
    expect(checkboxEurope).toBeChecked()

    // 4. deselect western europe
    await User.click(checkboxWE)
    expect(checkboxNE).toBeChecked()
    expect(checkboxCE).toBeChecked()
    expect(checkboxWE).not.toBeChecked()
    expect(checkboxEurope).not.toBeChecked()
    
    // 5. multiple clicks
    await User.click(checkboxWE)
    await User.click(checkboxWE)
    await User.click(checkboxWE)
    await User.click(checkboxWE)
    expect(checkboxNE).toBeChecked()
    expect(checkboxCE).toBeChecked()
    expect(checkboxWE).not.toBeChecked()
    expect(checkboxEurope).not.toBeChecked()

    // 6. open subregions for africa
    await User.click(subregionCollapseButtons[0])
    expect(subregionCollapseContent[0]).toHaveStyle('display: block')

    // 7. select north africa
    const checkboxAfrica = screen.getByRole('checkbox', { name: "Africa" })
    const checkboxNA = screen.getByRole('checkbox', { name: /Northern Africa/i })

    await userEvent.click(checkboxNA)
    expect(checkboxAfrica).toBeChecked()
    expect(checkboxNA).toBeChecked()
    expect(checkboxNE).toBeChecked()
    expect(checkboxCE).toBeChecked()
    expect(checkboxWE).not.toBeChecked()
    expect(checkboxEurope).not.toBeChecked()

    // 8. test reset button
    const reset = screen.getByRole('button', {name: /clear/i})
    await User.click(reset)

    expect(checkboxAfrica).not.toBeChecked()
    expect(checkboxNA).not.toBeChecked()
    expect(checkboxNE).not.toBeChecked()
    expect(checkboxCE).not.toBeChecked()
    expect(checkboxWE).not.toBeChecked()
    expect(checkboxEurope).not.toBeChecked()

    // 9. clicking the region should select all subregions
    await User.click(checkboxAfrica)
    expect(checkboxAfrica).toBeChecked()
    expect(checkboxNA).toBeChecked()

    await User.click(checkboxEurope)
    expect(checkboxEurope).toBeChecked()
    expect(checkboxNE).toBeChecked()
    expect(checkboxCE).toBeChecked()
    expect(checkboxWE).toBeChecked()

    // 10. unchecking a subregion should uncheck region
    await User.click(checkboxNA)
    expect(checkboxAfrica).not.toBeChecked()
    expect(checkboxNA).not.toBeChecked()

    // 11. without unchecking the other subregions
    await User.click(checkboxWE)
    expect(checkboxEurope).not.toBeChecked()
    expect(checkboxWE).not.toBeChecked()
    expect(checkboxNE).toBeChecked()
    expect(checkboxCE).toBeChecked()

  })
})