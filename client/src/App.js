import React from 'react'
import { Routes, Route, useNavigate } from 'react-router-dom';
import Home from './containers/Home';
import Login from './components/Login';
import Signup from './components/Signup';

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/*" element={<Home />} />
    </Routes>
  );
}

export default App;
