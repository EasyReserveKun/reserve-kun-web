//Import StyleSheets
import './DeleteAccount.css';

import React from 'react';

const DeletInformation = ({ onCancel, onConfirm }) => {
    return (
        <div id="overlay">
            <div id="">
                <div className="delete-confirm-modal">
                    <p>退会しますか？</p>
                    <p>退会するとアカウントは削除されます。</p>
                    <button onClick={onCancel} className="cancel-button">キャンセル</button>
                    <button onClick={onConfirm} className="delete-account-button">退会</button>
                </div>
            </div>
        </div>
    );
}

export default DeletInformation;