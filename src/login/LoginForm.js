import React, { useState } from 'react';
import Header from "../common/Header"
import Footer from "../common/Footer"
import '../common/Form.css';
import { useNavigate } from 'react-router-dom'

const LoginForm = () => {
  const navigate = useNavigate('');
  const [inputCid, setInputCid] = useState('');
  const [inputPassword, setInputPassword] = useState('')
  const [loginError, setLoginError] = useState('')

  const handleChangeCid = (event) => { setInputCid(event.target.value); }
  const handleChangePassword = (event) => { setInputPassword(event.target.value) }

  const loginAuth = async (event) => {
    event.preventDefault();
    setLoginError("");
    if (!inputCid.trim()) {
      await setLoginError("IDを入力してください");
      return null;
    }
    if (!inputPassword.trim()) {
      await setLoginError("パスワードを入力してください");
      return null;
    }
    let requestData = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ cid: inputCid, password: inputPassword })
    }
    const responce = await fetch("http://localhost:8080/customer/login", requestData);
    const data = await responce.json();

    if (data.status === "Success") {
      await sessionStorage.setItem('AccountName', data.results.name);
      await sessionStorage.setItem('AccountMail', data.results.mail);
      setLoginError("")
      navigate("/")
    } else {
      setLoginError("アカウントが見つかりません")

    }
  }

  return (
    <>
      <Header />
      <div className="login-container">
        <h2 className="login-title">ログイン</h2>
        <form className="login-form">
          <label htmlFor="email">ID(メールアドレス)</label>
          <input type="email" id="email" value={inputCid} onChange={handleChangeCid} required />

          <label htmlFor="password">パスワード</label>
          <input type="password" id="password" value={inputPassword} onChange={handleChangePassword} required />
          <p style={{ color: 'red' }}>{loginError}</p>
          <button type="button" onClick={loginAuth}>ログイン</button>
        </form>
        <div className="signup-link">
          <a href="/signup">アカウントをお持ちでない方はこちら</a>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default LoginForm;