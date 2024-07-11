import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import UploadCSV from './components/UploadCSV/UploadCSV';
import Fetch from './components/fetch';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/fetch' element={<Fetch />} />
        <Route path='/upload-csv' element={<UploadCSV />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
