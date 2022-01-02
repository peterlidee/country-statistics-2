import { Range, getTrackBackground } from 'react-range';
import colors from '../../../config/colors';
import PropTypes from 'prop-types';

function FilterRange(props){
  const sliderMin = props.min;
  const sliderMax = props.max;
  const values = props.sliderSelection;
  return(
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        flexWrap: 'wrap',
        paddingRight: '15px',
        paddingLeft: '15px',
        marginTop: '15px',
        marginBottom: '5px',
      }}
    >
      <Range
        values={values}
        step={props.steps}
        min={sliderMin}
        max={sliderMax}
        onChange={(values) => props.handleSliderSelection(values)}
        onFinalChange={(values) => props.handleSliderFinalSelection(values)}

        renderTrack={({ props, children }) => (
          <div
            onMouseDown={props.onMouseDown}
            onTouchStart={props.onTouchStart}
            style={{
              ...props.style,
              height: '32px',
              display: 'flex',
              width: '100%',
            }}
          >
            <div
              ref={props.ref}
              style={{
                height: '5px',
                width: '100%',
                borderRadius: '4px',
                background: getTrackBackground({
                  values,
                  colors: [colors.lightGrey, colors.blue, colors.lightGrey],
                  min: sliderMin,
                  max: sliderMax,
                }),
                alignSelf: 'center'
              }}
            >
              {children}
            </div>
          </div>
        )}
        renderThumb={({ props, isDragged }) => (
          <div
            {...props}
            style={{
              ...props.style,
              height: '30px',
              width: '30px',
              borderRadius: '50%',
              backgroundColor: '#FFF',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              boxShadow: '0px 2px 6px #AAA'
            }}
          >
            <div
              style={{
                height: '8px',
                width: '8px',
                borderRadius: '50%',
                backgroundColor: isDragged ? colors.blue : colors.lightGrey,
              }}
            />
          </div>
        )}
      />
    </div>
  )
}

FilterRange.propTypes = {
  min: PropTypes.number.isRequired,
  max: PropTypes.number.isRequired,
  steps: PropTypes.number.isRequired,
  sliderSelection: PropTypes.array.isRequired,
  handleSliderSelection: PropTypes.func.isRequired,
  sliderFinalSelection: PropTypes.array.isRequired,
  handleSliderFinalSelection: PropTypes.func.isRequired,
}

export default FilterRange;