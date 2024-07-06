// Import Modules
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// Import StyleSheets
import '../App.css';

// Import Components
import Header from '../common/Header';
import Footer from '../common/Footer';



function LogoutSuccess() {
  const navigate = useNavigate('');
  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/');
    }, 3000);

    return () => clearTimeout(timer);
  }, [navigate]);

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