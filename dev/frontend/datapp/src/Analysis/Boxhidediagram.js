import React, { useState } from 'react'

function Boxhidediagram() {
  const [variable1, setVariable1] = useState('');
  const [variable2, setVariable2] = useState('');
  const [variableList, setVariableList] = useState(['1', '2', '3']);

  const changeVariable1 = (e) => {
    setVariable1(e.target.value);
  };

  const changeVariable2 = (e) => {
    setVariable2(e.target.value);
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
    </div>
  )
}

export default Boxhidediagram
