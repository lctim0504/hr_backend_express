import React from 'react'
import {
  BrowserRouter as Router,
  Route,
  Routes,
} from "react-router-dom";
import Login from './component/Login';
import Home from './component/Home';
import Approval from './component/Approval';

const App = () => {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/home" element={<Home />} />
          <Route path="/approval" element={<Approval />} />
        </Routes>
      </Router>
    </div>
  )
}

export default App