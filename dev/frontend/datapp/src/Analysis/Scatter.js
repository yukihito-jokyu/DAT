import React, { useState } from 'react'
import './Scatter.css'

function Scatter() {
  const [variable1, setVariable1] = useState('');
  const [variable2, setVariable2] = useState('');
  const [target, setTarget] = useState('');
  const [reg, setReg] = useState(false);
  const [dimension, setDimension] = useState(1);
  const [variableList, setVariableList] = useState(['1', '2', '3']);
  const [targetList, setTargetList] = useState(['t1', 't2', 't3']);

  const changeVariable1 = (e) => {
    setVariable1(e.target.value);
  };

  const changeVariable2 = (e) => {
    setVariable2(e.target.value);
  };

  const changeTarget = (e) => {
    setTarget(e.target.value);
  };

  const changeReg = (e) => {
    setReg(e.target.value);
  }

  const changeDimension = (e) => {
    setDimension(e.target.value);
  };
  return (
    <div>
      <div className='config-wrapper'>
        <div className='config-name-wrapper'>
          <p>variable 1</p>
        </div>
        <div className='config-value-wrapper'>
          <select value={variable1} onChange={changeVariable1} >
            {variableList && variableList.map((value, idx) => {
              if (value !== variable2) {
                return (<option key={idx} value={value}>{value}</option>);
              }
              return null;
              })}
          </select>
        </div>
      </div>
      <div className='config-wrapper'>
        <div className='config-name-wrapper'>
          <p>variable 2</p>
        </div>
        <div className='config-value-wrapper'>
          <select value={variable2} onChange={changeVariable2} >
          {variableList && variableList.map((value, idx) => {
            if (value !== variable1) {
              return (<option key={idx} value={value}>{value}</option>);
            }
            return null;
          })}
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
      <div className='config-wrapper'>
        <div className='config-name-wrapper'>
          <p>regression</p>
        </div>
        <div className='config-value-wrapper'>
          <select value={reg} onChange={changeReg}>
            <option value="false">false</option>
            <option value="true">true</option>
          </select>
        </div>
      </div>
      <div className='config-wrapper'>
        <div className='config-name-wrapper'>
          <p>dimension</p>
        </div>
        <div className='config-value-wrapper'>
          <select value={dimension} onChange={changeDimension}>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="2">3</option>
          </select>
        </div>
      </div>
    </div>
  )
}

export default Scatter
