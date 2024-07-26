import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Dropdown from 'react-bootstrap/Dropdown';
import '../common/AdminHeader.css';
import LogoutComfirm from './LogoutComfirm';

const AdminHeader = () => {
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [adminDataOpen, setAdminDataOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const favicon = document.querySelector("link[rel='icon']");
    if (location.pathname.startsWith('/admin')) {
      favicon.href = `${process.env.PUBLIC_URL}/image/stafficon.ico`;
    } else {
      favicon.href = `${process.env.PUBLIC_URL}/icon.ico`;
    }
  }, [location]);

  const adminData = () => {
    setAdminDataOpen(!adminDataOpen)
  }

  const openLogoutModal = () => {
    setShowLogoutModal(true);
  };

  const closeLogoutModal = () => {
    setShowLogoutModal(false);
  };

  const handleLogout = async () => {
    await sessionStorage.removeItem("AccountName");
    await sessionStorage.removeItem("AccountMail");
    navigate("/logout");
  };

  const accountName = sessionStorage.getItem('AccountName');

  return (
    <Navbar bg="dark" variant="dark" expand="md">
      <div className="admlogo">
        <img src={`${process.env.PUBLIC_URL}/image/ace-logo.png`} alt="Logo" />
      </div>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="ml-auto">
          <Nav.Link href="/admin">Home</Nav.Link>

          <Dropdown>
            <Dropdown.Toggle variant="dark" id="dropdown-basic" className='adminheader-dropdown'>
              予約管理
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item href="/admin/close">予約停止 (日時選択)</Dropdown.Item>
              <Dropdown.Item href="/admin/open">予約停止の解除 (日時選択)</Dropdown.Item>
              <Dropdown.Item href="/admin/closeall">予約即時停止</Dropdown.Item>
              <Dropdown.Item href="/admin/openall">予約即時停止の解除</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>

          <Nav.Link href="/admin/list">予約一覧表示</Nav.Link>
          <Nav.Link className="bi bi-person-circle admin-icon" onClick={adminData}></Nav.Link>
        </Nav>
      </Navbar.Collapse>

      {adminDataOpen && (
        <div className='menu-admin'>
          <p>
            <div className='user-text'>
              ようこそ👋
            </div><br />
            {accountName}さん</p>
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
    </Navbar>
  );
};

export default AdminHeader;