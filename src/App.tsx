import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Welcome from './components/onboarding/Welcome';
import SignUp from './components/onboarding/SignUp';
import SignIn from './components/onboarding/SignIn';
import EmailVerification from './components/onboarding/EmailVerification';
import Dashboard from './components/dashboard/Dashboard';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Welcome />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/verify-email" element={<EmailVerification />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
