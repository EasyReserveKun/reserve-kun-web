import './App.css';

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from "./Home";
import Nf from "./Nf"
import LoginForm from './LoginForm';
import SignUp from './SignUp';
import LogoutSuccess from './LogoutSuccess';

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
