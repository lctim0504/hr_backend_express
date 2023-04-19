import React from 'react'
import {
  BrowserRouter as Router,
  Route,
  Routes,
} from "react-router-dom";
import Login from './component/Login';
import Home from './component/Home';
import Approval from './component/Approval';
import MySchedule from './component/Schedule';
import Login2 from './component/Login2';
import AdminPage from './component/admin/AdminPage';
import ExportBtn from './component/admin/ExportBtn';

const App = () => {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<ExportBtn />} />
          {/* <Route path="/" element={<Login2 />} /> */}
          <Route path="/home" element={<Home />} />
          <Route path="/approval" element={<Approval />} />
          <Route path="/schedule" element={<MySchedule />} />
          <Route path="/admin" element={<AdminPage />} />
        </Routes>
      </Router>
    </div>
  )
}

export default App