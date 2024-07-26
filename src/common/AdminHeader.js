import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Dropdown from 'react-bootstrap/Dropdown';
import '../common/AdminHeader.css';
import LogoutComfirm from './LogoutComfirm';
import { getApiUrl } from '../GetApiUrl';

const AdminHeader = () => {
  const [showLogoutModal, setShowLogoutModal] = useState(false);
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
    authAdmin()
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
          <Nav.Link className="admbutton-link" onClick={openLogoutModal}>Logout</Nav.Link>
        </Nav>
      </Navbar.Collapse>
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
