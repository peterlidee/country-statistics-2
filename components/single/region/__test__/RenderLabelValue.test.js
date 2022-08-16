import { screen, render } from '@testing-library/react'
import { toBeInTheDocument } from '@testing-library/jest-dom'
import RenderLabelValue from '../RenderLabelValue'

describe('components/single/region/RenderLabelValue', () => {

  test('It renders with hasData && value', () => {
    render(
      <RenderLabelValue 
        loading={false}
        label="label"
        value="value"
        hasData={true}
      />
    )
    expect(screen.queryByText('label')).toBeInTheDocument()
    expect(screen.queryByText('value')).toBeInTheDocument()
  })

  test('It renders with hasData && value=undefined ', () => {
    render(
      <RenderLabelValue 
        loading={false}
        label="label"
        value={undefined}
        hasData={true}
      />
    )
    expect(screen.queryByText('label')).toBeInTheDocument()
    expect(screen.queryByText('None')).toBeInTheDocument()
  })

  test('It renders with !hasData && !value', () => {
    render(
      <RenderLabelValue 
        loading={false}
        label="label"
        value={undefined}
        hasData={false}
      />
    )
    expect(screen.queryByText('label')).toBeInTheDocument()
    expect(screen.queryByText('No data')).toBeInTheDocument()
  })

  test('It renders with !hasData && loading', () => {
    render(
      <RenderLabelValue 
        loading={true}
        label="label"
        value={undefined}
        hasData={false}
      />
    )
    expect(screen.queryByText('label')).toBeInTheDocument()
    expect(screen.queryByText('...')).toBeInTheDocument()
  })

  test('It rerenders correctly', () => {
    const { rerender } = render(
      <RenderLabelValue 
        loading={false}
        label="label"
        value="first value"
        hasData={true}
      />
    )
    expect(screen.queryByText('label')).toBeInTheDocument()
    expect(screen.queryByText('first value')).toBeInTheDocument()
    rerender(
      <RenderLabelValue 
        loading={false}
        label="label"
        value="second value"
        hasData={true}
      />
    )
    expect(screen.queryByText('second value')).toBeInTheDocument()
  })

})