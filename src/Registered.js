import React from 'react';
import './Registered.css'; // 外部のCSSファイルをインポート

const Registered = () => {
    return (
        <div className="message">
            新規登録が完了しました！<br />
            <a  className="btn btn-primary">ログイン画面に戻る</a>
        </div>
    );
};

export default Registered;
