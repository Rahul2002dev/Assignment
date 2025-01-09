import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom'; // Correct imports
import Home from './conponents/Home';
import Login from './conponents/Login';
import Register from './conponents/Register';
import './App.css';

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <BrowserRouter>
        <Routes>
          {/* Define routes for Login, Register, and Home */}
          <Route path="/" element={<Login />} /> {/* Updated from component to element */}
          <Route path="/register" element={<Register />} />
          <Route path="/home" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
