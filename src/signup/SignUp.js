// Import Modules
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getApiUrl } from '../GetApiUrl';

// Import StyleSheets
import '../common/Form.css';

// Import Components
import Header from '../common/Header';
import Footer from '../common/Footer';
import Code from './Code';
import LoadingSpinner from '../LoadingSpinner';

const SignUp = () => {
  const navigate = useNavigate('');
  const [signupError, setSignupError] = useState('');
  const [inputName, setInputName] = useState('');
  const [inputEmail, setInputEmail] = useState('');
  const [inputEmailCheck, setInputEmailCheck] = useState('');
  const [inputPassword, setInputPassword] = useState('');
  const [inputPasswordCheck, setInputPasswordCheck] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [codeError, setCodeError] = useState('');
  const [verification, setVerification] = useState('');
  const [isLoading, setIsLoading] = useState(false);



  const handleChangeName = (event) => { setInputName(event.target.value); }
  const handleChangeEmail = (event) => { setInputEmail(event.target.value); }
  const handleChangeEmailCheck = (event) => { setInputEmailCheck(event.target.value); }
  const handleChangePassword = (event) => { setInputPassword(event.target.value); }
  const handleChangePasswordCheck = (event) => { setInputPasswordCheck(event.target.value); }

  const signupAuth = async (event) => {
    event.preventDefault();
    await setSignupError("");
    setIsLoading(true);
    document.body.style.overflow = 'hidden';

    const error = validateInputs();
    if (error) {
      setSignupError(error);
      setIsLoading(false);
      document.body.style.overflow = 'auto';
      return;
    }


    let requestData = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ cname: inputName, cid: inputEmail, password: inputPassword })
    }
    const response = await fetch(getApiUrl() + "/customer/signup", requestData);
    const data = await response.json();

    setIsLoading(false);


    if (data.status === "Success") {
      setVerification(data.code);
      setSignupError("");
      setIsModalOpen(true);
    } else {
      setSignupError("そのIDのアカウントは既に存在します");
      document.body.style.overflow = 'auto';
    }
  }

  // 認証コードのチェック
  const handleCodeSubmit = async (code) => {
    if (code === verification) {

      let requestData = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ cname: inputName, cid: inputEmail, password: inputPassword })
      }
      const response = await fetch(getApiUrl() + "/customer/verify", requestData);
      const data = await response.json();
      console.log(data.status);
      if (data.status === "Success") {
        navigate("/signupsuccess");
      } else {
        setSignupError("そのIDのアカウントは既に存在します");
        document.body.style.overflow = 'auto';
      }


    } else {
      setCodeError("認証コードが正しくありません。");
    }
  }

  // 認証コード用モーダル閉じる
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setVerification('');
    setCodeError('');
    document.body.style.overflow = 'auto';
  }


  const validateInputs = () => {
    // name
    if (!inputName.trim()) {
      return "名前を入力してください";
    }
    if (inputName.length < 2) {
      return "名前は2文字以上で入力してください";
    }
    if (inputName.length > 30) {
      return "名前は30文字以下で入力してください";
    }
    // email
    if (inputEmail !== inputEmailCheck) {
      return "IDが確認用と一致しません。もう一度入力してください。";
    }
    if (!inputEmail.trim()) {
      return "IDを入力して下さい";
    }
    if (inputEmail.length > 60) {
      return "IDは60文字以下で入力してください";
    }
    if (!inputEmail.includes('@')) {
      return "メールアドレスを入力してください";
    }
    // password
    if (inputPassword !== inputPasswordCheck) {
      return "パスワードが確認用と一致しません。もう一度入力してください。";
    }
    if (!inputPassword.trim()) {
      return "パスワードを入力して下さい";
    }
    if (inputPassword.length < 8) {
      return "パスワードは8文字以上で入力してください";
    }
    if (inputPassword.length > 60) {
      return "パスワードは60文字以下で入力してください";
    }
    return null;
  }

  return (
    <>
      <Header />
      {isLoading && <LoadingSpinner />}
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
          <button type="button" onClick={signupAuth} disabled={isLoading}>
            {isLoading ? "読み込み中..." : "登録"}
          </button>
        </form>
        <div className="another-link">
          <a href="/login">アカウントをお持ちの方はこちら</a>
        </div>
      </div>
      <Footer />
      {isModalOpen && <Code onCode={handleCodeSubmit} error={codeError} onCancel={handleCloseModal} />}
    </>
  );
};

export default SignUp;
