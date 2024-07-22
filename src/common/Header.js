import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie'
import LogoutComfirm from './LogoutComfirm'; // 新しく追加

// Import StyleSheets
import './Header.css';

const Header = () => {
  let navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false); // 追加
  const [subMenuOpen, setSubMenuOpen] = useState(false); // サブメニューの状態を追加
  const [cookie, , removeCookie] = useCookies(['token']);

  const token = cookie.token;

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const toggleSubMenu = (e) => {
    e.stopPropagation(); // イベントのバブリングを防止
    setSubMenuOpen(!subMenuOpen);
  };

  const goToLogin = () => {
    navigate("/login");
  };

  const handleLogout = async () => {
    removeCookie('token', { httpOnly: true, path: '/' });
    navigate("/logout");
  };

  const openLogoutModal = () => {
    setShowLogoutModal(true);
  };

  const closeLogoutModal = () => {
    setShowLogoutModal(false);
  };

  if (token) {
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
                <li><a href="/">ホーム画面</a></li>
                <li>
                  <a href="#category" onClick={toggleSubMenu}>カテゴリ</a>
                  <ul className={`sub-menu ${subMenuOpen ? 'open' : ''}`}>
                    <li><a href="/satohanako">リフォーム</a></li>
                    <li><a href="/tanakataro">不動産</a></li>
                    <li><a href="/suzukiichiro">介護</a></li>
                    <li><a href="/takahashimisaki">終活・相続</a></li>
                    <li><a href="/nakamurakenta">車・保険・金融</a></li>
                  </ul>
                </li>
                <li><a href="reservecheck">予約確認/変更/キャンセル</a></li>
                <li><a href="/Faq">FAQガイドライン <br></br>（よくある質問）</a></li>
                <li><a href="#form">問い合わせフォーム</a></li>
                <li><a href="/access">アクセス</a></li>
                <li><a href="/adminlogin">従業員の方はこちら</a></li>
                <li><button onClick={openLogoutModal}>ログアウト</button></li>
              </ul>
            </nav>
          )}
        </div>
        <div className="logo">
          <a href='/'><img src={`${process.env.PUBLIC_URL}/image/ace-logo.png`} alt="Logo" /></a>
        </div>

        <button className="bi bi-person-circle user-icon" onClick={openLogoutModal}></button>

        {/* ログアウト確認モーダル */}
        {showLogoutModal && (
          <div className="logout-modal-container">
            <LogoutComfirm
              onCancel={closeLogoutModal}
              onConfirm={handleLogout}
            />
          </div>
        )}
      </header>
    );
  } else {
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
                <li><a href="/">ホーム画面</a></li>
                <li>
                  <a href="#category" onClick={toggleSubMenu}>カテゴリ</a>
                  <ul className={`sub-menu ${subMenuOpen ? 'open' : ''}`}>
                    <li><a href="/satohanako">リフォーム</a></li>
                    <li><a href="/tanakataro">不動産</a></li>
                    <li><a href="/suzukiichiro">介護</a></li>
                    <li><a href="/takahashimisaki">終活・相続</a></li>
                    <li><a href="/nakamurakenta">車・保険・金融</a></li>
                  </ul>
                </li>
                <li><a href="/login">予約確認/変更/キャンセル</a></li>
                <li><a href="/Faq">FAQガイドライン <br></br>（よくある質問）</a></li>
                <li><a href="#form">問い合わせフォーム</a></li>
                <li><a href="/access">アクセス</a></li>
                <li><a href="/adminlogin">従業員の方はこちら</a></li>
                <li><a href="/login">ログイン</a></li>
              </ul>
            </nav>
          )}
        </div>
        <div className="logo">
          <a href='/'><img src={`${process.env.PUBLIC_URL}/image/ace-logo.png`} alt="Logo" /></a>
        </div>

        <button className="bi bi-person user-icon" onClick={goToLogin}></button>
      </header>
    );
  }
}

export default Header;
