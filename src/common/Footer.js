// Import Modules
import React from 'react';

// Import StyleSheets
import './Footer.css';

const Footer = () => {
    if (sessionStorage.getItem('AccountName') !== null) {
        return (
            <footer>
                <ul className='footer-menu'>
                    <li><a href="#category">カテゴリ</a>　</li>
                    <li> <a href="/ReserveCheck">予約確認/変更/キャンセル</a>　</li>
                    <li><a href="/Faq">FAQガイドライン</a>　</li>
                    <li><a href="#form">問い合わせフォーム</a>　</li>
                    <li><a href="/Access">アクセス</a>　</li>
                    <li><a href="/empLogin">従業員の方はこちら</a>　</li>
                    <li><a href="/logout">ログアウト</a></li>
                </ul>
                <p className="copyright">
                    &copy; 2024 YourWebsite.com | Designed by AIBS
                </p>
            </footer>
        );

    } else {
        return (

            <footer>
                <ul className='footer-menu'>
                    <li><a href="#category">カテゴリ</a>　</li>
                    <li> <a href="/login">予約確認/変更/キャンセル</a>　</li>
                    <li><a href="/Faq">FAQガイドライン</a>　</li>
                    <li><a href="#form">問い合わせフォーム</a>　</li>
                    <li><a href="/Access">アクセス</a>　</li>
                    <li><a href="/empLogin">従業員の方はこちら</a>　</li>
                    <li><a href="/login">ログイン</a>　</li>
                </ul>
                <p className="copyright">
                    &copy; 2024 YourWebsite.com | Designed by AIBS
                </p>
            </footer>
        );
    }


}

export default Footer;