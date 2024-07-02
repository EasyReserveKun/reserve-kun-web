import './LoginForm.css';

const LoginForm = () => {
  const handleFormSubmit = (event) => {
    event.preventDefault();
    window.location.href = 'test1.html'; // テスト用のURLにリダイレクト
  };

  return (
    <div className="container">
      <div className="row justify-content-center align-items-center">
        <div className="col-md-6 col-lg-4">
          <div className="card">
            <h5 className="card-header">ログイン</h5>
            <div className="card-body">
              <form id="loginForm" onSubmit={handleFormSubmit}>
                <div className="form-group">
                  <label htmlFor="email">ID(メールアドレス)</label>
                  <input type="email" id="email" name="email" className="form-control" required />
                </div>
                <div className="form-group">
                  <label htmlFor="password">パスワード</label>
                  <input type="password" id="password" name="password" className="form-control" required />
                </div>
                <button type="submit" className="btn btn-primary btn-block">ログイン</button>
              </form>
            </div>
            <div className="card-footer text-center">
              <p>アカウントをお持ちでない方はこちら</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
