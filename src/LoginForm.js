import React, { useState } from 'react';
import Header from "./Header"
import Footer from "./Footer"
import './LoginForm.css';
import { useNavigate } from 'react-router-dom'

const LoginForm = () => {
  const [inputCid, setInputCid] = useState('');
  const [inputPassword, setInputPassword] = useState('')
  const navigate = useNavigate()

  const handleChangeCid = (event) => { setInputCid(event.target.value); }
  const handleChangePassword = (event) => { setInputPassword(event.target.value) }

  const loginAuth = async (event) => {
    event.preventDefault();
    let requestData = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ cid: inputCid, password: inputPassword })
    }
    const responce = await fetch("http://localhost:8080/customer/login", requestData);
    const data = await responce.text();
    if(data === null){
      window.alert("ログインに失敗")
    }else{
      sessionStorage.setItem('AccountName',data.result);
      navigate("/")
    }
  }

  return (
    <>
    <Header />
    <div className="login-container">
      <h2 className="login-title">ログイン</h2>
      <form className="login-form">{/*  method="POST" action='http://localhost:8080/customer/login' */}
        <label htmlFor="email">ID(メールアドレス)</label>
        <input type="email" id="email" value={inputCid} onChange={handleChangeCid} required />
        
        <label htmlFor="password">パスワード</label>
        <input type="password" id="password" value={inputPassword} onChange={handleChangePassword} required />
        
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