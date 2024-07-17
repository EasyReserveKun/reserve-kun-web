// Import Modules
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'
import { getApiUrl } from './GetApiUrl';


import './common/Form.css';

import Header from './common/Header.js';
import Footer from './common/Footer.js';

function EmpLogin() {
    const navigate = useNavigate();
    const [inputPassword, setInputPassword] = useState('');
    const [inputCid, setInputCid] = useState('');
    const [loginError, setLoginError] = useState('')

    const handleChangeCid = (event) => { setInputCid(event.target.value); }
    const handleChangePassword = (event) => { setInputPassword(event.target.value) }


    const loginAuth = async (event) => {
        event.preventDefault();
        setLoginError("");

        if (!inputCid.trim()) {
            setLoginError("IDを入力してください");
            return null;
        }
        if (inputCid.length > 30) {
            setLoginError("正しいIDを入力してください");
            return null;
        }
        if (!inputPassword.trim()) {
            setLoginError("パスワードを入力してください");
            return null;
        }
        if (inputPassword.length > 60) {
            setLoginError("正しいパスワードを入力してください");
            return null;
        }


        let requestData = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ password: inputPassword })
        }
        const responce = await fetch(getApiUrl() + "URL", requestData);
        const data = await responce.json();
        if (data.status === "Success") {
            await sessionStorage.setItem('AdName', data.results.name);
            setLoginError("")
            navigate("/AdminPage")
        } else {
            setLoginError("正しいIDまたは、パスワードを入力してください。")
        }
    }
    return (
        <>
            <Header />
            <div className="form-container">
                <h2 className="form-title">従業員専用ログイン</h2>

                <form className="form-style">
                    <label htmlFor="email">ID</label>
                    <input type="email" id="email" value={inputCid} onChange={handleChangeCid} required />
                    <label htmlFor="password">パスワード</label>
                    <input type="password" id="password" value={inputPassword} onChange={handleChangePassword} required />
                    <p style={{ color: 'red' }}>{loginError}</p>
                    <button type="button" onClick={loginAuth}>ログイン</button>
                </form>
            </div>
            <Footer />
        </>
    );
};

export default EmpLogin;