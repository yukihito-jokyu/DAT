import React from 'react'
import Custom from './Custom'
import './Analysis.css'
import Plt from './Plt'
import Chat from './Chat'

function Analysis() {
  return (
    <div className='analysis-wrapper'>
      <Custom />
      <Plt />
      <Chat />
    </div>
  )
}

export default Analysis
