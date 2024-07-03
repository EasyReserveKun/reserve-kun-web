import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Header.css';
import logo from './img/ace-logo.png';

const Header = () => {
  let navigate = useNavigate();
  function goToLogin(){
    navigate("/login")
  }
  function goToLogout(){
    console.log("log outボタンが押されました。")
  };
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

if(sessionStorage.getItem('AccountName') !== null){
  return (
    //Loginしてたら
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
              <li><a href="#category">カテゴリ</a></li>
              <li><a href="#reserve-info">予約確認/確認/キャンセル</a></li>
              <li><a href="#faq">FAQガイドライン <br></br>（よくある質問）</a></li>
              <li><a href="#form">問い合わせフォーム</a></li>
              <li><a href="#access">アクセス</a></li>
              <li><button onClick={goToLogout}>ログアウト</button></li>
            </ul>
          </nav>
        )}
      </div>
      <div className="logo">
        <a href='/'><img src={logo} alt="Logo" /></a>
      </div>

      <div className='right-menu'>
        <button className="bi bi-person-circle user-icon" onClick={goToLogout}></button>
      </div>
    </header>
  );
        }else{
          return(
            //Login前
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
                    <li><a href="#category">カテゴリ</a></li>
                    <li><a href="/login">予約確認/確認/キャンセル</a></li>
                    <li><a href="#faq">FAQガイドライン <br></br>（よくある質問）</a></li>
                    <li><a href="#form">問い合わせフォーム</a></li>
                    <li><a href="#access">アクセス</a></li>
                    <li><a href="/login">ログイン</a></li>
                  </ul>
                </nav>
              )}
            </div>
            <div className="logo">
              <a href='/'><img src={logo} alt="Logo" /></a>
            </div>
      
            <div className='right-menu'>
              <button className="bi bi-person user-icon" onClick={goToLogin}></button>
            </div>
          </header>
          );
        }
}

export default Header;
