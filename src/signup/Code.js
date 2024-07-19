import './Code.css';
import React, { useState } from 'react';

const Code = ({ onCode, error, onCancel }) => {
    const [code, setCode] = useState('');

    const handleChange = (event) => {
        setCode(event.target.value);
    }

    const handleSubmit = () => {
        onCode(code);
    }

    return (
        <div id="overlay-delete">
            <div className="authentication-modal">
                <h4>認証コード</h4>
                <p>登録に使用したメールアドレスに認証コードを送信しました。</p>
                <p>認証コードを入力してください。</p>
                {error && <p className="error-message">{error}</p>}
                <input type='text' maxLength="20" className='verification-code-text' value={code} onChange={handleChange} />
                <br />
                <button onClick={handleSubmit} className="verification-button">送信</button>
                <button onClick={onCancel} className="delete-button">キャンセル</button>
            </div>
        </div>
    );
}

export default Code;
