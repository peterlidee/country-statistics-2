import { screen, render } from '@testing-library/react'
import { toBeInTheDocument } from '@testing-library/jest-dom'
import userEvent from '@testing-library/user-event'

import FilterCheckBox from '../../region/FilterCheckbox'

describe('components/filters/region/FilterCheckBox', () => {
  test('It renders', () => {
    const { container } = render(
      <FilterCheckBox 
        label="name"
        active={false} 
        handler={() => {}} 
      />
    )
    expect(container.querySelector('.filtercheckbox__label')).toBeInTheDocument()
    expect(container.querySelector('.filtercheckbox__label')).toHaveTextContent('name')
    expect(screen.getByRole('checkbox', { name: 'name' })).toBeInTheDocument()
    expect(screen.getByRole('checkbox', { name: 'name' })).not.toBeChecked()
  })
})