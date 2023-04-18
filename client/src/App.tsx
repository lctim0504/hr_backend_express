import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './views/Login';
import Absence from './views/Absence';
import OverTime from './views/OverTime';
import Approval from './views/Approval';
import AdminPage from './views/AdminPage';

function App() {

  const [config, setConfig] = useState(() => {
    const storedConfig = localStorage.getItem('config');
    return storedConfig ? JSON.parse(storedConfig) : {};
  });

  useEffect(() => {
    localStorage.setItem('config', JSON.stringify(config));
  }, [config]);

  return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login setConfig={setConfig} />} />
          <Route path="/Absence" element={<Absence config={config} />} />
          <Route path="/Overtime" element={<OverTime config={config} />} />
          <Route path="/Approval" element={<Approval config={config} />} />
          <Route path="/Control" element={<AdminPage />} />

          {/* <Route path="/Import" element={<Import />} />
        <Route path="/Search" element={<Import />} />
        <Route path="/HRApproval" element={<HRApproval />} /> */}
        </Routes>
      </BrowserRouter>
  );
}

export default App;


