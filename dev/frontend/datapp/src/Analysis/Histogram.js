import React, { useState } from 'react';
import './Histogram.css';

function Histogram() {
  const [variable, setVariable] = useState('');
  const [target, setTarget] = useState('');
  const [variableList, setVariableList] = useState(['1', '2', '3']);
  const [targetList, setTargetList] = useState(['t1', 't2', 't3']);

  const changeVariable = (e) => {
    setVariable(e.target.value);
  }

  const changeTarget = (e) => {
    setTarget(e.target.value);
  };
  return (
    <div>
      <div className='config-wrapper'>
        <div className='config-name-wrapper'>
          <p>variable</p>
        </div>
        <div className='config-value-wrapper'>
          <select value={variable} onChange={changeVariable} >
            {variableList && variableList.map((value, idx) => (
              <option key={idx} value={value}>{value}</option>
            ))}
          </select>
        </div>
      </div>
      <div className='config-wrapper'>
        <div className='config-name-wrapper'>
          <p>target</p>
        </div>
        <div className='config-value-wrapper'>
          <select value={target} onChange={changeTarget} >
            {targetList && targetList.map((value, idx) => (
              <option key={idx} value={value}>{value}</option>
            ))}
          </select>
        </div>
      </div>
    </div>
  )
}

export default Histogram
