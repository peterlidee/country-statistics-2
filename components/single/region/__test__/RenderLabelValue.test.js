import { screen, render } from '@testing-library/react'
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
    expect(screen.getByText('label')).toBeInTheDocument()
    expect(screen.getByText('value')).toBeInTheDocument()
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
    expect(screen.getByText('label')).toBeInTheDocument()
    expect(screen.getByText('None')).toBeInTheDocument()
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
    expect(screen.getByText('label')).toBeInTheDocument()
    expect(screen.getByText('No data')).toBeInTheDocument()
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
    expect(screen.getByText('label')).toBeInTheDocument()
    expect(screen.getByText('...')).toBeInTheDocument()
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
    expect(screen.getByText('label')).toBeInTheDocument()
    expect(screen.getByText('first value')).toBeInTheDocument()
    rerender(
      <RenderLabelValue 
        loading={false}
        label="label"
        value="second value"
        hasData={true}
      />
    )
    expect(screen.getByText('second value')).toBeInTheDocument()
  })

})