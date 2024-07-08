// Import Modules
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'
import { getApiUrl } from '../GetApiUrl';

// Import StyleSheets
import '../common/Form.css';

// Import Components
import Header from '../common/Header'
import Footer from '../common/Footer'


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
    await setSignupError("");
    //const errorMessage = await validation()

    //name
    if (!inputName.trim()) {
      setSignupError("名前を入力してください");
      return null;
    }
    if (inputName.length < 2) {
      setSignupError("名前は2文字以上で入力してください");
      return null;
    }
    if (inputName.length > 30) {
      setSignupError("名前は30文字以下で入力してください");
      return null;
    }
    //id
    if (inputEmail !== inputEmailCheck) {
      setSignupError("IDが確認用と一致しません。もう一度入力してください。");
      return null;
    }
    if (!inputEmail.trim()) {
      setSignupError("IDを入力して下さい");
      return null;
    }
    if (inputEmail.length > 60) {
      setSignupError("IDは60文字以下で入力してください");
      return null;
    }
    //pass
    if (inputPassword !== inputPasswordCheck) {
      setSignupError("パスワードが確認用と一致しません。もう一度入力してください。");
      return null;
    }
    if (!inputPassword.trim()) {
      setSignupError("パスワードを入力して下さい");
      return null;
    }
    if (inputPassword.length < 8) {
      setSignupError("パスワードは8文字以上で入力してください");
      return null;
    }
    if (inputPassword.length > 60) {
      setSignupError("パスワードは60文字以下で入力してください");
      return null;
    }

    let requestData = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ cname: inputName, cid: inputEmail, password: inputPassword })
    }
    const responce = await fetch(getApiUrl() + "/customer/signup", requestData);
    const data = await responce.json();
    console.log(data.status);
    if (data.status === "Success") {
      setSignupError("");
      navigate("/")
    } else {
      setSignupError("そのIDのアカウントは既に存在します");
    }
  }

  // const validation = () => {
  //   //name
  //   if (!inputName.trim()) {
  //     return "名前を入力してください";
  //   }
  //   if (inputName.length < 2) {
  //     return "名前は2文字以上で入力してください";
  //   }
  //   if (inputName.length > 30) {
  //     return "名前は30文字以下で入力してください";
  //   }
  //   //id
  //   if (inputEmail !== inputEmailCheck) {
  //     return "IDが確認用と一致しません。もう一度入力してください。";
  //   }
  //   if (!inputEmail.trim()) {
  //     return "IDを入力して下さい";
  //   }
  //   if (inputEmail.length > 30) {
  //     return "IDは30文字以下で入力してください";
  //   }
  //   //pass
  //   if (inputPassword !== inputPasswordCheck) {
  //     return "パスワードが確認用と一致しません。もう一度入力してください。";
  //   }
  //   if (!inputPassword.trim()) {
  //     return "パスワードを入力して下さい";
  //   }
  //   if (inputPassword.length < 8) {
  //     return "IDは30文字以下で入力してください";
  //   }
  //   if (inputPassword.length > 60) {
  //     return "パスワードは60文字以下で入力してください";
  //   }
  //   return "";
  // }


  return (
    <>
      <Header />
      <div className="form-container">
        <h2 className="form-title">新規登録</h2>
        <form className="form-style">
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
        <div className="another-link">
          <a href="/login">アカウントをお持ちの方はこちら</a>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default SingUp;