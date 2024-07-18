import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import './AdmHeader.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const AdmHeader = () => {
    
    return (
        <Navbar bg="dark" variant="dark" expand="md">
             <div className="admlogo">
          <img src={`${process.env.PUBLIC_URL}/image/ace-logo.png`} alt="Logo" />
        </div>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="ml-auto">
                    <Nav.Link href="#">Home</Nav.Link>
                    <Nav.Link href="/AdminPage">予約停止(選択)</Nav.Link>
                    <Nav.Link href="#">予約一時停止</Nav.Link>
                    <Nav.Link href="/ReactivationPage">予約停止の解除</Nav.Link>
                    <Nav.Link href="#">予約一覧</Nav.Link>
                    <Nav.Link className="admbutton-link" href="#">Logout</Nav.Link>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
};

export default AdmHeader;
