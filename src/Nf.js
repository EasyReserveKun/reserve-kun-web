import React from 'react';
import './App.css';
import './Nf.css';

// Import Components
import Header from './Header';
import Footer from './Footer';

function Nf() {
  return (
    <div className="nf-container">
      <Header className="header" />
      <div className="message">
        申し訳ございませんが、お探しのページは見つかりませんでした。<br />
        以下のリンクを使用してホームページに移動してください。<br />
        <a href="/">ホーム画面へ</a>
      </div>
      <Footer className="footer" />
    </div>
  );
}

export default Nf;
