// Import Modules
import React from 'react';

// Import StyleSheets
import './Footer.css';

const Footer = () => {

    const handleLogout = async () => {
        await sessionStorage.removeItem("AccountName");
        await sessionStorage.removeItem("AccountMail");
        navigate("/logout");
    };

    const openLogoutModal = () => {
        setShowLogoutModal(true);
    };

    const closeLogoutModal = () => {
        setShowLogoutModal(false);
    };

    if (sessionStorage.getItem('AccountName') !== null) {
        return (
            <footer>
                {/* ログアウト確認モーダル */}
                {showLogoutModal && (
                    <div className="logout-modal-container">
                        <LogoutComfirm
                            onCancel={closeLogoutModal}
                            onConfirm={handleLogout}
                        />
                    </div>
                )}
                <ul className='footer-menu'>
                    <li><a href="#category">カテゴリ</a>　</li>
                    <li> <a href="#reserve-info">予約確認/変更/キャンセル</a>　</li>
                    <li><a href="#faq">FAQガイドライン</a>　</li>
                    <li><a href="#form">問い合わせフォーム</a>　</li>
                    <li><a href="#access">アクセス</a>　</li>
                    <li><a href="/" onClick={openLogoutModal}>ログアウト</a></li>
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
                    <li><a href="#faq">FAQガイドライン</a>　</li>
                    <li><a href="#form">問い合わせフォーム</a>　</li>
                    <li><a href="#access">アクセス</a>　</li>
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