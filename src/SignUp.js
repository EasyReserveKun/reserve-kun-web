import React from 'react';
import './SignUp.css'; // Import external CSS file

const SignUp = () => {
    const handleSubmit = (event) => {
        event.preventDefault();
        // Simulating registration success and redirect
        window.location.href = 'test5.html';
        console.log('新規登録が完了しました。');
    };

    return (
        <div className="container">
            <div className="row justify-content-center align-items-center vh-100">
                <div className="col-md-4">
                    <div className="card">
                        <h5 className="card-header">新規登録</h5>
                        <div className="card-body">
                            <form id="registerForm" onSubmit={handleSubmit}>
                                <div className="form-group">
                                    <label htmlFor="name">名前</label>
                                    <input type="text" id="name" name="name" className="form-control" required />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="email">ID(メールアドレス)</label>
                                    <input type="email" id="email" name="email" className="form-control" required />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="password">パスワード</label>
                                    <input type="password" id="password" name="password" className="form-control" required />
                                </div>
                                <button type="submit" className="btn btn-primary btn-block">新規登録</button>
                            </form>
                        </div>
                        <div className="card-footer text-center">
                            <p>アカウントをお持ちの方はこちら</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SignUp;
