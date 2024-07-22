import React, { useState } from 'react'
import Custom from './Custom'
import './Analysis.css'
import Plt from './Plt'
import Chat from './Chat'

function Analysis() {
  const [scatter, setScatter] = useState(true);
  const [histogram, setHistogram] = useState(false);
  const [boxhidediagram, setBoxhidediagram] = useState(false);
  const [image, setImage] = useState('');

  const selectionScatter = () => {
    setScatter(true);
    setHistogram(false);
    setBoxhidediagram(false);
  }

  const selectionHistogram = () => {
    setScatter(false);
    setHistogram(true);
    setBoxhidediagram(false);
  }
  
  const selectionBoxhidediagram = () => {
    setScatter(false);
    setHistogram(false);
    setBoxhidediagram(true);
  }
  return (
    <div className='analysis-wrapper'>
      <Custom selectionScatter={selectionScatter} selectionHistogram={selectionHistogram} selectionBoxhidediagram={selectionBoxhidediagram} scatter={scatter} histogram={histogram} boxhidediagram={boxhidediagram} />
      <Plt />
      <Chat />
    </div>
  )
}

export default Analysis
