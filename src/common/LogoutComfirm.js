// Import Modules
import React from 'react';

//Import StyleSheets
import './LogoutComfirm.css';

//ログアウトの確認
const LogoutComfirm = ({ onCancel, onConfirm }) => {
    return (
        <div id="overlay">
            <div id="">
                <div className="logout-confirm-modal">
                    <p>ログアウトしますか？</p>
                    <button onClick={onCancel} className="cancel-button">キャンセル</button>
                    <button onClick={onConfirm} className="logout-button">ログアウト</button>
                </div>
            </div>
        </div>
    );
}

export default LogoutComfirm;
