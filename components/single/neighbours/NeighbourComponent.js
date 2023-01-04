import Sources from '../../sources/Sources'

const NeighbourComponent = (props) => (
  <>
    <div className="single-country__box">
      <div className="single-country__label">neighbouring countries</div>
      <div className="single-country__value">
        {props.children}
      </div>
    </div>
    {props.source &&
      <Sources>
        {props.source}
      </Sources>
    }
  </>
)

export default NeighbourComponent