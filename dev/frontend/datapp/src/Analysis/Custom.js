import React from 'react'
import './Analysis.css'
import './Custom.css'
import Scatter from './Scatter'
import Histogram from './Histogram'
import Boxhidediagram from './Boxhidediagram'

function Custom({ selectionScatter, selectionHistogram, selectionBoxhidediagram, scatter, histogram, boxhidediagram }) {
  return (
    <div className='custom-wrapper'>
      <div className='plt-selection'>
        <div className='selection-wrapper'>
          <div className='scatter-button' onClick={selectionScatter}>
            <p>scatter</p>
          </div>
          <div className='histogram-button' onClick={selectionHistogram}>
            <p>histogram</p>
          </div>
          <div className='boxhidediagram-button' onClick={selectionBoxhidediagram}>
            <p>box-hide</p>
          </div>
        </div>
      </div>
      {scatter && <Scatter />}
      {histogram && <Histogram />}
      {boxhidediagram && <Boxhidediagram />}
    </div>
  )
}

export default Custom
