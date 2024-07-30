//Import Modules
import React from 'react';

// Import StyleSheets
import './Warn.css';

//各確認の表示
const Warn = (props) => {
    if (props.showWarn) {
        return (
            <div id="overlay">
                <div id="">
                    <div className="warn-modal">
                        <p>{props.text}</p>
                        <button onClick={() => props.setShowWarn(false)} className="warn-close-button">閉じる</button>
                    </div>
                </div>
            </div>
        );
    }
}

export default Warn;
