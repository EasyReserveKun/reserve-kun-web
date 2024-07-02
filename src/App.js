import './App.css';

import { BrowserRouter, Switch,  Routes, Route } from 'react-router-dom';
import Home from "./Home";
import Nf from "./Nf"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={`/`} element={<Home />} />
        {/* <Route path={`/login`} element={<login />} />
        <Route path={`/Page2`} element={<Page2 />} /> */}
        <Route path={`/*`} element={<Nf />} />
      </Routes>
    </BrowserRouter>
  );
}
export default App;
