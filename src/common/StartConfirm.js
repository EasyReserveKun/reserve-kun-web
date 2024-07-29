import './LogoutComfirm.css';
// LogoutComfirm.js

import React from 'react';

const StartComfirm = ({ onCancel, onConfirm }) => {
    return (
        <div id="overlay">
            <div id="">
                <div className="logout-confirm-modal">
                    <p>受付を開始してよろしいですか？</p>
                    <button onClick={onCancel} className="cancel-button">キャンセル</button>
                    <button onClick={onConfirm}className="logout-button">開始する</button>
                </div>
            </div>
        </div>
    );
}

export default StartComfirm;
