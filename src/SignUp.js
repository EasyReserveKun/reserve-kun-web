import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'
import Header from './Header'
import Footer from './Footer'

import './LoginForm.css';

const SingUp = (event) => {
  const navigate = useNavigate('');
  const [signupError, setSignupError] = useState('');
  const [inputName, setInputName] = useState('');
  const [inputEmail, setInputEmail] = useState('');
  const [inputEmailCheck, setInputEmailCheck] = useState('');
  const [inputPassword, setInputPassword] = useState('');
  const [inputPasswordCheck, setInputPasswordCheck] = useState('');

  const handleChangeName = (event) => { setInputName(event.target.value); }
  const handleChangeEmail = (event) => { setInputEmail(event.target.value); }
  const handleChangeEmailCheck = (event) => { setInputEmailCheck(event.target.value); }
  const handleChangePassword = (event) => { setInputPassword(event.target.value); }
  const handleChangePasswordCheck = (event) => { setInputPasswordCheck(event.target.value); }

  const signupAuth = async (event) => {
    event.preventDefault();
    setSignupError("");
    if (!inputName.trim()) {
      setSignupError("名前を入力してください");
      return null;
    }
    if (inputEmail !== inputEmailCheck) {
      setSignupError("IDが正しくありません");
      return null;
    }
    if (!inputEmail.trim()) {
      setSignupError("IDを入力して下さい");
      return null;
    }
    if (inputPassword !== inputPasswordCheck) {
      setSignupError("パスワードが正しくありません");
      return null;
    }
    if (!inputPassword.trim()) {
      setSignupError("パスワードを入力して下さい");
      return null;
    }
    let requestData = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ cname: inputName, cid: inputEmail, password: inputPassword })
    }
    const responce = await fetch("http://localhost:8080/customer/signup", requestData);
    const data = await responce.json();
    console.log(data.status);
    if (data.status === "Success") {
      setSignupError("");
      navigate("/")
    } else {
      setSignupError("そのIDのアカウントは既に存在します");
    }
  }

  return (
    <>
      <Header />
      <div className="login-container">
        <h2 className="login-title">新規登録</h2>
        <form className="login-form">
          <label htmlFor="name">名前</label>
          <input type="name" id="name" name="name" onChange={handleChangeName} required />

          <label htmlFor="email">ID(メールアドレス)</label>
          <input type="email" id="email" name="email" onChange={handleChangeEmail} required />

          <label htmlFor="email">ID(確認用)</label>
          <input type="email" id="email" name="emailCheck" onChange={handleChangeEmailCheck} required />

          <label htmlFor="password">パスワード</label>
          <input type="password" id="password" name="password" onChange={handleChangePassword} required />

          <label htmlFor="password">パスワード(確認用)</label>
          <input type="password" id="password" name="passwordCheck" onChange={handleChangePasswordCheck} required />
          <p style={{ color: 'red' }}>{signupError}</p>
          <button type="button" onClick={signupAuth}>登録</button>
        </form>
        <div className="signup-link">
          <a href="/login">アカウントをお持ちの方はこちら</a>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default SingUp;