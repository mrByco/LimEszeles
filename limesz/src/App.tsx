import React from 'react';
import logo from './logo.svg';

import { BrowserRouter as Router } from 'react-router-dom';
import { Routes, Route } from 'react-router-dom';

import './App.css';
import { Registration } from './Auth/Registration';
import { Login } from './Auth/Login';
import { Home } from './Home';

function App() {
  return (
    <div className="App">

      <Router>
        <div>
          <section>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/signup" element={<Registration />} />
              <Route path="/login" element={<Login />} />
            </Routes>
          </section>
        </div>
      </Router>
    </div>
  );
}

export default App;
