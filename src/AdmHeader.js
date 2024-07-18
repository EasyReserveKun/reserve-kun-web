import React from 'react';
import { useNavigate } from 'react-router-dom';
import './AdmHeader.css';

const AdmHeader = () => {
    let navigate = useNavigate();
    return (
        <header className="admsite-header">
            <div className="wrapper admsite-header__wrapper">
                <div className="admlogo">
                    <img src={`${process.env.PUBLIC_URL}/image/ace-logo.png`} alt="Logo" />
                </div>
                <nav className="admnav">
                    <button className="admnav__toggle" aria-expanded="false" type="button">
                        menu
                    </button>
                    <ul className="admnav__wrapper">
                        <li className="admnav__item"><a href="#">Home</a></li>
                        <li className="admnav__item"><a href="#">予約停止(選択)</a></li>
                        <li className="admnav__item"><a href="#">予約一時停止</a></li>
                        <li className="admnav__item"><a href="#">予約一覧</a></li>
                        <li className="admnav__item"><a href="#" className="admbutton-link">Logout</a></li>
                    </ul>
                </nav>
            </div>
        </header>
    );
};

export default AdmHeader;
