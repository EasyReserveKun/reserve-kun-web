import React, { useEffect } from 'react';
import './App.css';


// Import Components
import Header from './Header';
import Footer from './Footer';


import { useNavigate } from 'react-router-dom';


function LogoutSuccess() {
  let navigate = useNavigate();
  useEffect(() => {
    setTimeout(() => {
      navigate('/');
    }, 3 * 1000);
// eslint-disable-next-line
  }, []);

  return (
    <div className="nf-container">
      <Header className="header" />
      <div className="message">
      <h3>ログアウトしました</h3>
            <p>ご利用ありがとうございました。3秒後にホーム画面に戻ります。</p>
            <p>お急ぎの場合は、下のボタンをクリックしてください。</p>
            <a href="/" className="home-button">ホームに戻る</a>
      </div>
      <Footer className="footer" />
    </div>
  );
}


export default LogoutSuccess;