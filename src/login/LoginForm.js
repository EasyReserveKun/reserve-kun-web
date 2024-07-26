// Import Modules
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'
import { useCookies } from 'react-cookie'
import { getApiUrl } from '../GetApiUrl';

// Import StyleSheets
import '../common/Form.css';

// Import Components
import Header from "../common/Header"
import Footer from "../common/Footer"


const LoginForm = () => {
  const navigate = useNavigate('');
  const [inputCid, setInputCid] = useState('');
  const [inputPassword, setInputPassword] = useState('')
  const [loginError, setLoginError] = useState('')
  const [cookie, setCookie,] = useCookies();

  const handleChangeCid = (event) => { setInputCid(event.target.value); }
  const handleChangePassword = (event) => { setInputPassword(event.target.value) }

  useEffect(() => {
    if (cookie.token != null) {
      navigate("/");
    }
  }, [navigate, cookie.token])

  const loginAuth = async (event) => {
    event.preventDefault();
    setLoginError("");
    //let errorMessage = await validation();

    if (!inputCid.trim()) {
      setLoginError("IDを入力してください");
      return null;
    }
    if (inputCid.length > 30) {
      setLoginError("IDは30文字以下で入力してください");
      return null;
    }
    if (!inputPassword.trim()) {
      setLoginError("パスワードを入力してください");
      return null;
    }
    if (inputPassword.length > 60) {
      setLoginError("パスワードは60文字以下で入力してください");
      return null;
    }

    let requestData = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ cid: inputCid, password: inputPassword })
    }
    const responce = await fetch(getApiUrl() + "/customer/login", requestData);
    const data = await responce.json();
    if (data.status === "Success") {
      setCookie('token', data.token, { path: '/' });
      setLoginError("")
      navigate("/")
    } else {
      setLoginError("IDまたはパスワードが間違っています")
    }
  }

  // const validation = () => {
  //   if (!inputCid.trim()) {
  //     return "IDを入力してください";
  //   }
  //   if (inputCid.length > 30) {
  //     return "IDは30文字以下で入力してください";
  //   }
  //   if (!inputPassword.trim()) {
  //     return "パスワードを入力してください";
  //   }
  //   if (inputPassword.length > 60) {
  //     return "パスワードは60文字以下で入力してください";
  //   }
  // }

  return (
    <>
      <Header />
      <div className="form-container">
        <h2 className="form-title">ログイン</h2>
        <form className="form-style">
          <label htmlFor="email">ID(メールアドレス)</label>
          <input type="email" id="email" value={inputCid} onChange={handleChangeCid} required />

          <label htmlFor="password">パスワード</label>
          <input type="password" id="password" value={inputPassword} onChange={handleChangePassword} required />
          <p style={{ color: 'red' }}>{loginError}</p>
          <button type="button" onClick={loginAuth}>ログイン</button>
        </form>
        <div className="another-link">
          <a href="/signup">アカウントをお持ちでない方はこちら</a>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default LoginForm;