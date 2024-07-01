import React from 'react';

import './Toolbar.css'; // スタイルシートの読み込み

const Toolbar = () => {
  return (
    <div className="fixed-bar">
        <button className='reserve-button'>今すぐ予約する！</button>
    </div>
  );
};

export default Toolbar;