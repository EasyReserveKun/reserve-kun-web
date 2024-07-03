import React from 'react';
import { useNavigate } from 'react-router-dom';

import './Toolbar.css'; // スタイルシートの読み込み

const Toolbar = () => {
  let navigate = useNavigate();
  function goToLogin() {
    navigate("/login")
  } 
  function goToReserve() {
    navigate("/")
  } 
  const debugFlag = false;
  if(debugFlag){
    return (
      <div className="fixed-bar">
        <button className='reserve-button' onClick={goToReserve}>今すぐ予約する！</button>
      </div>
      );
  }else{
  return (
    <div className="fixed-bar">
      <button className='reserve-button' onClick={goToLogin}>今すぐ予約する！</button>
    </div>
    );
  }
};

export default Toolbar;