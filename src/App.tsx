import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Welcome from './components/onboarding/Welcome';
import SignUp from './components/onboarding/SignUp';
import './App.css';
import EmailVerification from './components/onboarding/EmailVerification';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Welcome />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/verify-email" element={<EmailVerification />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
