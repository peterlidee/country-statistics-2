import { screen, render } from '@testing-library/react'

import NeighbourComponent from '../NeighbourComponent'
import Sources from '../../../sources/Sources'

const ChildMock = jest.fn()
jest.mock('../../../sources/Sources')

describe('components/single/neighbours/NeighbourComponent', () => {

  test('It renders with no source', () => {
    render(
      <NeighbourComponent>
        <ChildMock />
      </NeighbourComponent>
    )
    expect(ChildMock).toHaveBeenCalled()
    expect(Sources).not.toHaveBeenCalled()
  })

  test('It renders with source', () => {
    render(
      <NeighbourComponent source="source">
        <ChildMock />
      </NeighbourComponent>
    )
    expect(Sources).toHaveBeenCalledWith(
      expect.objectContaining({ children: 'source' }),
      expect.anything()
    )
  })
  
})