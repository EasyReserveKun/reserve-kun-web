import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import '../common/AdminHeader.css';
import LogoutComfirm from './LogoutComfirm';


const AdminHeader = () => {
  const [showLogoutModal, setShowLogoutModal] = useState(false);
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
  let navigate = useNavigate();

  return (
    <Navbar bg="dark" variant="dark" expand="md">
      <div className="admlogo">
        <img src={`${process.env.PUBLIC_URL}/image/ace-logo.png`} alt="Logo" />
      </div>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="ml-auto">

          <Nav.Link href="/admin">Home</Nav.Link>
          <Nav.Link href="/admin/close">予約停止 (日時選択)</Nav.Link>
          <Nav.Link href="/admin/open">予約停止の解除 (日時選択)</Nav.Link>
          <Nav.Link href="/admin/closeall">予約即時停止</Nav.Link>
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
