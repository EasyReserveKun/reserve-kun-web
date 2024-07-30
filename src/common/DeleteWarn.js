// Import Modules
import React from 'react';

//Import StyleSheets
import './Warn.css';

//退会処理後の表示
const DeleteWarn = (props) => {
    const { text, showWarn, onDelete } = props;
    if (showWarn) {
        return (
            <div id="overlay">
                <div className="warn-modal">
                    <p>{text}</p>
                    <button onClick={onDelete} className="warn-close-button">閉じる</button>
                </div>
            </div>
        );
    }
    return null;
}

export default DeleteWarn;
