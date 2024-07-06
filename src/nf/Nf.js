// Import Modules
import React from 'react';

// Import StyleSheets
import '../App.css';
import './Nf.css';

// Import Components
import Header from '../common/Header';
import Footer from '../common/Footer';

function Nf() {
  return (
    <div className="nf-container">
      <Header />
      <div className="message">
        申し訳ございませんが、お探しのページは見つかりませんでした。<br />
        以下のリンクを使用してホームページに移動してください。<br />
        <a href="/">ホーム画面へ</a>
      </div>
      <Footer />
    </div>
  );
}

export default Nf;
