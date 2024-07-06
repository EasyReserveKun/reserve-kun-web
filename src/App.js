// Import Modules
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Import StyleSheets
import './App.css';

// Import Components
import Home from "./home/Home";
import Nf from "./nf/Nf"
import LoginForm from './login/LoginForm';
import SignUp from './signup/SignUp';
import LogoutSuccess from './logout/LogoutSuccess';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={`/`} element={<Home />} />
        <Route path={`/login`} element={<LoginForm />} />
        <Route path={`/signup`} element={<SignUp />} />
        <Route path={`/logout`} element={<LogoutSuccess />} />
        <Route path={`/*`} element={<Nf />} />
      </Routes>
    </BrowserRouter>
  );
}
export default App;
