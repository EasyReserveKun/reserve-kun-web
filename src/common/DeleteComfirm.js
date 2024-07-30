//Import StyleSheets
import './DeleteComfirm.css';

import React from 'react';

const DeleteComfirm = ({ onCancel, onConfirm }) => {
    return (
        <div id="overlay-delete">
            <div id="">
                <div className="logout-confirm-modal">
                    <p>本当にキャンセルしてよろしいですか？</p>
                    <button onClick={onCancel} className="cancel-button">戻る</button>
                    <button onClick={onConfirm} className="delete-button">キャンセル</button>
                </div>
            </div>
        </div>
    );
}

export default DeleteComfirm;
