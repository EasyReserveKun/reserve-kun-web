// Import Modules
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'
import { useCookies } from 'react-cookie';
import { getApiUrl } from '../GetApiUrl.js';

//Import StyleSheets
import '../common/Form.css';
import './AdminLogin.css';

//Import Component
import Header from '../common/Header.js';
import Footer from '../common/Footer.js';

function AdminLogin() {
    const navigate = useNavigate();
    const [inputPassword, setInputPassword] = useState('');
    const [inputCid, setInputCid] = useState('');
    const [loginError, setLoginError] = useState('')
    const [cookie, setCookie,] = useCookies();

    const handleChangeCid = (event) => { setInputCid(event.target.value); }
    const handleChangePassword = (event) => { setInputPassword(event.target.value) }

    useEffect(() => {
        if (cookie.admin != null) {
            navigate("/admin");
        }
    }, [cookie, navigate])

    //ログインの処理
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
            body: JSON.stringify({ cid: inputCid, password: inputPassword })
        }
        const responce = await fetch(getApiUrl() + "/admin/login", requestData);
        const data = await responce.json();
        if (data.status === "Success") {
            setCookie('admin', data.token, { path: '/' });
            setLoginError("")
            navigate("/admin")
        } else if (data.status === "Denied") {
            setLoginError("権限がありません。")
        } else if (data.status === "NotExist") {
            setLoginError("IDまたはパスワードが間違っています")
        } else {
            setLoginError("エラーが発生しました。")
        }
    }
    return (
        //管理者ログイン画面
        <>
            <Header />
            <div className='homeLink'>
                <a href="/">ホーム&gt;</a>
                <a href="/adminLogin">管理者ログイン</a>
            </div>
            <div className="form-container">
                <h2 className="admform-title">従業員専用ログイン</h2>

                <form className="admform-style">
                    <label htmlFor="email">ID</label>
                    <input type="email" id="email" value={inputCid} onChange={handleChangeCid} required />
                    <label htmlFor="password">パスワード</label>
                    <input type="password" id="password" value={inputPassword} onChange={handleChangePassword} required />
                    <p style={{ color: 'red' }}>{loginError}</p>
                    <button type="button" className="admlogin-button" onClick={loginAuth}>ログイン</button>
                </form>
            </div>
            <Footer />
        </>
    );
};

export default AdminLogin;