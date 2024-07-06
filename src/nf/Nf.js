// Import Modules
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// Import StyleSheets
import '../App.css';
import './Nf.css';

// Import Components
import Header from '../common/Header';
import Footer from '../common/Footer';

function Nf() {
  const navigate = useNavigate('');
  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/');
    }, 3000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="nf-container">
      <Header />
      <div className="message">
        申し訳ございませんが、お探しのページは見つかりませんでした。<br />
        3秒後に自動でホーム画面へ移動します。<br />
        <a href="/">ホーム画面へ</a>
      </div>
      <Footer />
    </div>
  );
}

export default Nf;
