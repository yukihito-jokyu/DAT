import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import UploadCSV from './components/UploadCSV/UploadCSV';
import Fetch from './components/fetch';
import Analysis from './Analysis/Analysis';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/fetch' element={<Fetch />} />
        <Route path='/upload-csv' element={<UploadCSV />} />
        <Route path='/analysis' element={<Analysis />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
