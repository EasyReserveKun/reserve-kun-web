// Import Modules
import React from 'react';

// Import StyleSheets
import '../App.css';
import './SignUpSuccess.css';

// Import Components
import Header from '../common/Header';
import Footer from '../common/Footer';

function SignUpSuccess() {

  return (
    <div className="sus-container">
      <Header />
      <div className="sus-message">
        新規登録が完了しました。<br />
        ログインしてから引き続きご利用ください。<br />
        <a href="/">ホーム画面へ</a>　　<a href="/login">ログイン画面へ</a>
      </div>
      <Footer />
    </div>
  );
}

export default SignUpSuccess;
