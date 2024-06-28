import './App.css';
import Header from './Header.js'
import Search from './Search.js'
import Modal from './Modal.js'
import './Modal.css';
import React, { useState} from 'react';

function App() {

  const [show, setShow] = useState(false)
  const tFlag = true;
  const fFlag = false;
  return (
  <div className="App">
    <Header />
    <Search />
      <div>
        <button onClick={() => setShow(!show)}>Modalの表示</button>
        <Modal show={show} setShow={setShow} isEnable={fFlag} employee="(コンシェルジュの名前)"/>
      </div>
  </div>
  );
}
export default App;