// Import Modules
import React from 'react';
import { useCookies } from 'react-cookie'

// Import StyleSheets
import './Footer.css';

const Footer = () => {
    const [cookie, ,] = useCookies();
    if (cookie.token) {
        //ログイン時ホーム画面下の表示
        return (
            <footer>
                <ul className='footer-menu'>
                    <li><a href="#category">カテゴリ</a></li>
                    <li> <a href="/reservecheck">予約確認/変更/キャンセル</a></li>
                    <li><a href="/Faq">FAQガイドライン</a></li>
                    <li><a href="#form">問い合わせフォーム</a></li>
                    <li><a href="/access">アクセス</a></li>
                    <li><a href="/adminlogin">従業員の方はこちら</a></li>
                    <li><a href="/logout">ログアウト</a></li>
                </ul>
                <p className="copyright">
                    &copy; 2024 EasyReserveKun | Designed by AIBS
                </p>
            </footer>
        );

    } else {
        //未ログイン時ホーム画面下の表示
        return (
            <footer>
                <ul className='footer-menu'>
                    <li><a href="#category">カテゴリ</a></li>
                    <li> <a href="/login">予約確認/変更/キャンセル</a></li>
                    <li><a href="/Faq">FAQガイドライン</a></li>
                    <li><a href="#form">問い合わせフォーム</a></li>
                    <li><a href="/access">アクセス</a></li>
                    <li><a href="/adminlogin">従業員の方はこちら</a></li>
                    <li><a href="/login">ログイン</a></li>
                </ul>
                <p className="copyright">
                    &copy; 2024 EasyReserveKun | Designed by AIBS
                </p>
            </footer>
        );
    }
}

export default Footer;
