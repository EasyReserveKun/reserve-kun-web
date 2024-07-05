import React from 'react';
import './Footer.css'; // 別途作成したCSSファイルをインポートする
import { useNavigate } from 'react-router-dom';

const Footer = () => {
    let navigate = useNavigate();
    function goToLogin() {
        navigate("/login")
    }

    if (sessionStorage.getItem('AccountName') !== null) {
        return (

            <footer>
                <div className="footer-bottom">
                    <ul className='footer-menu'>
                        <li><a href="#category">カテゴリ</a>　</li>
                        <li> <a href="#reserve-info">予約確認/確認/キャンセル</a>　</li>
                        <li><a href="#faq">FAQガイドライン（よくある質問）</a>　</li>
                        <li><a href="#form">問い合わせフォーム</a>　</li>
                        <li><a href="#access">アクセス</a>　</li>
                        <li><a href="#logout">ログアウト</a>　</li>
                    </ul>
                    <p className="copyright">
                        &copy; 2024 YourWebsite.com | Designed by AIBS
                    </p>
                </div>
            </footer>
        );

    } else {
        return (

            <footer>
                <div className="footer-bottom">
                    <ul className='footer-menu'>
                        <li><a href="#category">カテゴリ</a>　</li>
                        <li> <a href="#reserve-info">予約確認/確認/キャンセル</a>　</li>
                        <li><a href="#faq">FAQガイドライン（よくある質問）</a>　</li>
                        <li><a href="#form">問い合わせフォーム</a>　</li>
                        <li><a href="#access">アクセス</a>　</li>
                        <li><a href="/login">ログイン</a>　</li>
                    </ul>
                    <p className="copyright">
                        &copy; 2024 YourWebsite.com | Designed by AIBS
                    </p></div>
            </footer>
        );
    }


}

export default Footer;