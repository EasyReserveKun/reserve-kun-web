//Import Modules
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie'

// Import StyleSheets
import './Toolbar.css';

const Toolbar = ({ onClick }) => {
  const [cookie, ,] = useCookies();
  let navigate = useNavigate();

  // スクロール位置を監視するための state
  const [showScrollButton, setShowScrollButton] = useState(false);

  useEffect(() => {
    // スクロール位置の監視
    const handleScroll = () => {
      if (window.pageYOffset > 100) { // 例として100pxスクロールしたらボタンを表示`
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



  return (
    <div className="toolbar-container">
      {cookie.token ? (
        <button className='reserve-button' onClick={onClick}>今すぐ予約する！</button>
      ) : (
        <button className='reserve-button' onClick={goToLogin}>今すぐ予約する！</button>
      )}
      {showScrollButton && (
        <button className="scroll-to-top-button" onClick={scrollToTop} title="ページの一番上に戻る">Top</button>
      )}
    </div>
  );
};

export default Toolbar;
