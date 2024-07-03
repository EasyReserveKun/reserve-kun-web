import React from 'react';
import Header from './Header'
import './LoginForm.css';

const SingUp = () => {
  return (
    <>
    <Header />
    <div className="login-container">
      <h2 className="login-title">新規登録</h2>
      <form className="login-form">
        <label htmlFor="name">名前</label>
        <input type="name" id="name" name="name" required />

        <label htmlFor="email">ID(メールアドレス)</label>
        <input type="email" id="email" name="email" required />
        
        <label htmlFor="password">パスワード</label>
        <input type="password" id="password" name="password" required />
        
        <button type="submit">登録</button>
      </form>
      <div className="signup-link">
        <a href="/login">アカウントをお持ちの方はこちら</a>
      </div>
    </div>
    </>
  );
};

export default SingUp;