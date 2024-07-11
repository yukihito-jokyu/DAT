import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import UploadCSV from './components/UploadCSV/UploadCSV';
import SelectColumn from './components/SelectColumn/SelectColumn';
import Fetch from './components/fetch';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/fetch' element={<Fetch />} />
        <Route path='/upload-csv' element={<UploadCSV />} />
        <Route path='/select-column' element={<SelectColumn />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
