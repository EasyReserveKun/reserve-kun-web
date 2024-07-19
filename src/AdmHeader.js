import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import './AdmHeader.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import LogoutComfirm from './common/LogoutComfirm';


const AdmHeader = () => {
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

                    <Nav.Link href="EmployeePortalHome">Home</Nav.Link>
                    <Nav.Link href="AdminPage">予約停止 (日時選択)</Nav.Link>
                    <Nav.Link href="ReactivationPage">予約停止の解除 (日時選択)</Nav.Link>
                    <Nav.Link href="BatchStopProcessing">予約即時停止</Nav.Link>
                    <Nav.Link href="ReservationList">予約一覧表示</Nav.Link>
                    <Nav.Link href="/ReactivationPage">予約停止解除</Nav.Link>
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

export default AdmHeader;
