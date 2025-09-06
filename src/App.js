import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './Pages/Home';
import Login from './Pages/Login';
import Entertainment from './Pages/Entertainment';
import Productivity from './Pages/Productivity';
import Smart from './Pages/Smart';
import Profile from './Pages/Profile';
import Admin from './Pages/Admin';
import Register from './Pages/Register';
import Features from './Pages/Features';
function App() {
  const [darkMode, setDarkMode] = useState(true);

  return (
    <div className={darkMode ? 'dark' : 'light'}>
      {/* Navbar with dark/light toggle */}
      <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />

      <Routes>
        <Route path="/" element={<Home darkMode={darkMode} setDarkMode={setDarkMode} />} />
        <Route path="/entertainment" element={<Entertainment darkMode={darkMode} />} />
        <Route path="/productivity" element={<Productivity darkMode={darkMode} />} />
        <Route path="/smart" element={<Smart darkMode={darkMode} />} />
        <Route path="/profile" element={<Profile darkMode={darkMode} />} />
        <Route path="/admin" element={<Admin darkMode={darkMode} />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register darkMode={darkMode} />} />
         <Route path="/features" element={<Features darkMode={darkMode} />} />
      </Routes>
    </div>
  );
}

export default App;
