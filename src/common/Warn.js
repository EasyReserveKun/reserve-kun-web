import './Warn.css';

import React from 'react';

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
