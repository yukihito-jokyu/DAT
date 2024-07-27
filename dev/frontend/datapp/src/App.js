import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import UploadCSV from './components/UploadCSV/UploadCSV';
import Fetch from './components/fetch';
import Analysis from './Analysis/Analysis';
import DataInfo from './components/DataInfo/DataInfo';
import ColumnDetail from './components/ColumnDetail/ColumnDetail';
import MissingValueImputation from './components/MissingValueImputation/MissingValueImputation';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/fetch' element={<Fetch />} />
        <Route path='/upload-csv' element={<UploadCSV />} />
        <Route path='/data-info' element={<DataInfo />} />
        <Route path="/data-info/:columnName/:type" element={<ColumnDetail />} />
        <Route path='/miss-input' element={<MissingValueImputation />} />
        <Route path='/analysis' element={<Analysis />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
