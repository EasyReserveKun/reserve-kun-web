import React from 'react';
import Header from "./Header"
import Footer from "./Footer"
import './LoginForm.css';

const LoginForm = () => {
  return (
    <>
    <Header />
    <div className="login-container">
      <h2 className="login-title">ログイン</h2>
      <form className="login-form">
        <label htmlFor="email">ID(メールアドレス)</label>
        <input type="email" id="email" name="email" required />
        
        <label htmlFor="password">パスワード</label>
        <input type="password" id="password" name="password" required />
        
        <button type="submit">ログイン</button>
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