// Import Modules
import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import { getApiUrl } from '../GetApiUrl';

//Import StyleSheets
import '../common/AdminHeader.css';

//Import Component
import LogoutComfirm from './LogoutComfirm';

const AdminHeader = () => {
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [adminDataOpen, setAdminDataOpen] = useState(false);
  const [adminMenuOpen, setAdminMenuOpen] = useState(false);
  const [subMenuOpen, setSubMenuOpen] = useState(false);
  const [accountName, setAccountName] = useState("");
  const [cookie, , removeCookie] = useCookies();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const authAdmin = async () => {
      const requestData = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token: cookie.admin })
      };
      const response = await fetch(getApiUrl() + "/auth/admin", requestData);
      const data = await response.json();
      if (data.status === "Denied") {
        removeCookie('admin', { path: '/' });
        navigate("/adminlogin");
      }
    }
    if (cookie.admin == null) {
      navigate("/")
    } else {
      authAdmin()
    }
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    const favicon = document.querySelector("link[rel='icon']");
    if (location.pathname.startsWith('/admin')) {
      favicon.href = `${process.env.PUBLIC_URL}/image/stafficon.ico`;
    } else {
      favicon.href = `${process.env.PUBLIC_URL}/icon.ico`;
    }
  }, [location]);

  useEffect(() => {
    if (cookie.admin) {
      const fetchAccountName = async () => {
        const requestData = {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ token: cookie.admin })
        };

        try {
          const response = await fetch(getApiUrl() + "/customer/getname", requestData);
          const data = await response.json();
          if (data.status === "Success") {
            setAccountName(data.name);
          }
        } catch (error) {
          console.error('Fetch Error:', error);
        }
      }
      fetchAccountName();
    };
  }, [cookie.admin]);


  const adminMenu = () => {
    setAdminMenuOpen(!adminMenuOpen);
    if (!adminMenuOpen) {
      setAdminDataOpen(false);
    }
  };

  const adminSubMenu = (e) => {
    e.stopPropagation();
    setSubMenuOpen(!subMenuOpen);
  };

  const adminData = () => {
    setAdminDataOpen(!adminDataOpen)
    if (!adminDataOpen) {
      setAdminMenuOpen(false);
    }
  }

  const openLogoutModal = () => {
    setShowLogoutModal(true);
  };

  const closeLogoutModal = () => {
    setShowLogoutModal(false);
  };

  const handleLogout = async () => {
    removeCookie('admin', { path: '/' });
    navigate("/logout");
  };

  return (
    <header className='admin-header'>
      <div className="menu-admin" onClick={adminMenu}>
        <div className={`hamburger ${adminMenuOpen ? 'open' : ''}`}>
          <span></span>
          <span></span>
          <span></span>
        </div>
        {adminMenuOpen && (
          <nav className="admin-navigation">
            <ul>
              <li><a href="/admin">ホーム画面</a></li>
              <li>
                <div role="button" onClick={adminSubMenu} className="menu-item">予約管理</div>
                <ul className={`sub-menu ${subMenuOpen ? 'open' : ''}`}>
                  <li><a href="/admin/close">予約停止 (日時選択)</a></li>
                  <li><a href="/admin/open">予約停止の解除 (日時選択)</a></li>
                  <li><a href="/admin/closeall">予約即時停止</a></li>
                  <li><a href="/admin/openall">予約即時停止の解除</a></li>
                </ul>
              </li>
              <li><a href="/admin/list">予約一覧表示</a></li>
            </ul>
          </nav>
        )}
      </div>
      <div className="admim-logo">
        <a href='/admin'><img src={`${process.env.PUBLIC_URL}/image/ace-logo.png`} alt="Logo" /></a>
      </div>

      <button className="bi bi-person-circle admin-icon" onClick={adminData}></button>

      {adminDataOpen && (
        <div className='menu-admin-data'>
          <p>
            <div className='admin-text'>
              ようこそ👋
            </div><br />
            {accountName}さん
          </p>
          <button className='admin-logout' onClick={openLogoutModal}>ログアウト</button>
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
    </header>
  );
};

export default AdminHeader;
