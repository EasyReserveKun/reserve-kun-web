// Toolbar.js

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Toolbar.css'; // スタイルシートの読み込み

const Toolbar = () => {
  let navigate = useNavigate();

  // スクロール位置を監視するための state
  const [showScrollButton, setShowScrollButton] = useState(false);

  useEffect(() => {
    // スクロール位置の監視
    const handleScroll = () => {
      if (window.pageYOffset > 100) { // 例として100pxスクロールしたらボタンを表示
        setShowScrollButton(true);
      } else {
        setShowScrollButton(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // トップに戻る関数
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  function goToLogin() {
    navigate("/login");
  }

  function goToReserve() {
    navigate("/");
  }

  return (
    <div className="toolbar-container">
      <div className="fixed-bar">
        {sessionStorage.getItem('AccountName') !== null ? (
          <button className='reserve-button' onClick={goToReserve}>今すぐ予約する！</button>
        ) : (
          <button className='reserve-button' onClick={goToLogin}>今すぐ予約する！</button>
        )}
      </div>
      {/* 一番上に戻るボタン */}
      {showScrollButton && (
        <button className="scroll-to-top-button" onClick={scrollToTop} title="ページの一番上に戻る">Top</button>
      )}
    </div>
  );
};

export default Toolbar;
