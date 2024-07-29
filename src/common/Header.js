import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie'
import LogoutComfirm from './LogoutComfirm'; // 新しく追加
import Warn from './Warn';
import { getApiUrl } from '../GetApiUrl';

// Import StyleSheets
import './Header.css';
import DeleteAccount from './DeleteAccount';

const Header = () => {
  let navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false); // 追加
  const [subMenuOpen, setSubMenuOpen] = useState(false); // サブメニューの状態を追加
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [warnText, setWarnText] = useState("");
  const [showWarn, setShowWarn] = useState(false);
  const [userName, setUserName] = useState("");
  const [cookie, , removeCookie] = useCookies();


  useEffect(() => {
    if (cookie.token) {
      const fetchUserName = async () => {
        let requestData = {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ token: cookie.token }),
        };

        try {
          const response = await fetch(getApiUrl() + "/customer/getname", requestData);
          const data = await response.json();

          if (data.status === "Success") {
            setUserName(data.name);
          }
        } catch (error) {
          console.error('Fetch Error:', error);
        }
      };

      fetchUserName();
    }
  }, [cookie.token]);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
    if (!menuOpen) {
      setUserMenuOpen(false);
    }
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

  const handleDelete = async () => {
    let requestData = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ token: cookie.token })
    }

    try {
      const responce = await fetch(getApiUrl() + "/customer/leave", requestData);
      const data = await responce.json();

      if (data.status === "Success") {
        removeCookie('token', { httpOnly: true, path: '/' });
        await setWarnText("退会が完了しました。\n またのご利用お待ちしております。");
        await setShowWarn(true);
      } else {
        await setWarnText("エラーが発生し、退会の処理が行われませんでした。 \n もう一度最初からやり直してください。")
        await setShowWarn(true);
      }
    } catch (error) {
      console.error('Fetch Error:', error);
      //TODO: エラー処理
    }
  }

  const userMenu = () => {
    setUserMenuOpen(!userMenuOpen);
    if (!userMenuOpen) {
      setMenuOpen(false);
    }
  }

  const openLogoutModal = () => {
    setShowLogoutModal(true);
  };

  const closeLogoutModal = () => {
    setShowLogoutModal(false);
  };

  const openDeleteModal = () => {
    setDeleteModal(true);
  }

  const closeDeleteModal = () => {
    setDeleteModal(false);
  }

  if (cookie.token) {
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

        <button className="bi bi-person-circle user-icon" onClick={userMenu}></button>

        {userMenuOpen && (
          <div className="menu-user">
            <p>
              <div className='user-text'>
                ようこそ👋
              </div><br />
              {userName}さん</p>
            <button className='user-logout' onClick={openLogoutModal}>ログアウト</button>
            <button className='delete-account' onClick={openDeleteModal}>退会する</button>
          </div>
        )}

        {/* ログアウト確認モーダル */}
        {showLogoutModal && (
          <div className="logout-modal-container">
            <LogoutComfirm
              onCancel={closeLogoutModal}
              onConfirm={handleLogout}
            />
          </div>
        )}

        {deleteModal && (
          <div className="delete-modal-container">
            <DeleteAccount
              onCancel={closeDeleteModal}
              onConfirm={handleDelete}
            />
          </div>
        )}
        <Warn text={warnText} showWarn={showWarn} setShowWarn={setShowWarn} />
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
