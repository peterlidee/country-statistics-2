import { screen, render } from '@testing-library/react'
import { toBeInTheDocument, toHaveAttribute } from '@testing-library/jest-dom'
import IconLogo from '../IconLogo'
import colors from '../../../config/colors'

let element;
beforeEach(() => {
  const { container } = render(<IconLogo />)
  element = container
})

describe('svgSnippets/IconLogo.js', () => {
  test('It renders', () => {
    expect(element.querySelector('svg')).toBeInTheDocument()
  })
  test('It recieves the correct colors', () => {
    // screen.debug()
    const svg = element.querySelector('svg')
    expect(svg.querySelector('.logo-globe__earth')).toHaveAttribute('fill', colors.blue)
    expect(svg.querySelector('.logo-globe__meridians')).toHaveAttribute('stroke', colors.white)
    const parallels = svg.querySelectorAll('.logo-globe__parallels')
    expect(parallels).toHaveLength(2)
    for(const parallel of parallels){
      expect(parallel).toHaveAttribute('fill', colors.white)
    }
    expect(svg.querySelector('.logo__divider')).toHaveAttribute('fill', colors.black)
    const graphs = svg.querySelectorAll('.logo__graph')
    expect(graphs).toHaveLength(4)
    for(const graph of graphs){
      expect(graph).toHaveAttribute('fill', colors.lightGrey)
    }
  })
})