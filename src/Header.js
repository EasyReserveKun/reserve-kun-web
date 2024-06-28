import React, { useState } from 'react';
import './Header.css'; // スタイルシートのインポート
import { FaUserCircle } from 'react-icons/fa'; // アイコンのインポート

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <header className="header">
      <div className="menu-toggle" onClick={toggleMenu}>
        <div className={`hamburger ${menuOpen ? 'open' : ''}`}>
          <span></span>
          <span></span>
          <span></span>
        </div>
        {menuOpen && (
          <nav className="menu">
            <ul>
              <li><a href="#home">ホーム画面</a></li>
              <li><a href="#category">カテゴリ</a></li>
              <li><a href="#reserve-info">予約確認/確認/キャンセル</a></li>
              <li><a href="#faq">FAQガイドライン（よくある質問）</a></li>
              <li><a href="#form">問い合わせフォーム</a></li>
              <li><a href="#access">アクセス</a></li>
              <li><a href="#log‐out">ログアウト</a></li>
            </ul>
          </nav>
        )}
      </div>
      <div className="logo">
        <h1>Ace</h1>
      </div>
      <div className="icons">
        <FaUserCircle className="user-icon" />
        <button className="login-button">ログイン</button>
      </div>
      <div className="reservation">
        <button className="reserve-button">予約する</button>
      </div>
    </header>
  );
}

export default Header;
