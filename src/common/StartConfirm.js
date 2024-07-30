//Import Modules
import React from 'react';

// Import StyleSheets
import './LogoutComfirm.css';

//受付開始確認の表示
const StartComfirm = ({ onCancel, onConfirm }) => {
    return (
        <div id="overlay">
            <div id="">
                <div className="logout-confirm-modal">
                    <p>受付を開始してよろしいですか？</p>
                    <button onClick={onCancel} className="cancel-button">キャンセル</button>
                    <button onClick={onConfirm} className="logout-button">開始する</button>
                </div>
            </div>
        </div>
    );
}

export default StartComfirm;
