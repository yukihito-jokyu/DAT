import { useEffect, useState } from "react";
import ButtonAppBar from "./uicomponents/MenuAppBar";

import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Analysis from "./Analysis/Analysis";

function App() {
  const [message, setMessage] = useState('');
  useEffect(() => {
    // Flaskからデータを取得し、messageに格納している
    const fetchMessage = async () => {
      try {
        const response = await fetch('http://127.0.0.1:5000/', {
          method: 'GET'
        });
        const result = await response.json();
        setMessage(String(result.message));
      } catch (e) {
        console.error('Error fetching data:', e);
      }
    };
    fetchMessage();
  }, []);

  return (
    <div>
      <Router>
        <Routes>
          <Route path="/analysis" element={<Analysis />} />
        </Routes>
      </Router>
      {/* {message} */}
      {/* <ButtonAppBar /> */}
    </div>
  );
}

export default App;
