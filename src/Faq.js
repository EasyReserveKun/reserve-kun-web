import React, { useRef } from 'react';

// Import StyleSheets
import './App.css';
import './Faq.css';

// Import Components
import Header from './common/Header.js';
import Toolbar from './common/Toolbar.js'
import Footer from './common/Footer.js'; // eslint-disable-next-line
import Home from "./home/Home";
import Nf from "./nf/Nf"
import LoginForm from './login/LoginForm';
import SignUp from './signup/SignUp';
import LogoutSuccess from './logout/LogoutSuccess';
import SignUpSuccess from './signup/SignUpSuccess';

function Faq() {
    return (
        <div>
            <Header />

            <div className='faq-container'>

                <h3>よくある質問</h3>
                <div className="faq-question">Q: コンシェルジュデスクの利用方法は？</div>
                <div className="faq-answer">
                    A: コンシェルジュデスクのご利用は簡単です。スマートフォンやパソコンからオンライン予約システムを使って予約を取ることができます。営業時間は10:00〜20:00で、1回のご相談は1時間です。
                </div>
                <div className="faq-question">Q: コンシェルジュデスクの利用料金はありますか？</div>
                <div className="faq-answer">
                    A: 現在、コンシェルジュデスクのご利用は無料です。お気軽にご相談いただけます。
                </div>
                <div className="faq-question">Q: 予約なしでコンシェルジュデスクを利用できますか？</div>
                <div className="faq-answer">
                    A: コンシェルジュデスクのご利用には予約が必要です。オンラインシステムから事前にご予約いただければ、お待たせすることなくご相談いただけます。
                </div>
                <div className="faq-question">Q: 相談内容は秘密にされますか？</div>
                <div className="faq-answer">
                    A: はい、コンシェルジュデスクでのご相談内容は厳密に守られます。個人情報保護方針に基づき、お客様のプライバシーはしっかりと守られますので、安心してご相談ください。
                </div>
                <div className="faq-question">Q: 相談の際に必要な持ち物や資料はありますか？</div>
                <div className="faq-answer">
                    A: 相談内容に応じて必要な資料や情報が異なりますが、基本的にはご相談の内容に関連する書類や写真、メモなどをご持参いただけるとスムーズに進みます。詳細は予約時にお知らせいたします。
                </div>
                <div className="faq-question">Q: 相談時間を延長することはできますか？</div>
                <div className="faq-answer">
                    A: 原則として1回のご相談時間は1時間ですが、相談内容によっては延長が可能な場合もあります。延長をご希望の場合は、事前にご相談ください。ただし、他の予約状況によっては対応できない場合もございますので、ご了承ください。
                </div>
                <div className="faq-question">Q: 相談後のフォローアップはありますか？</div>
                <div className="faq-answer">
                    A: 相談後のフォローアップも行っております。ご相談内容に基づき、必要な追加情報やアドバイスを提供いたします。また、再度ご相談が必要な場合もお気軽にお問い合わせください。
                </div>
                <div className="faq-question">Q: 予約のキャンセルや変更はできますか？</div>
                <div className="faq-answer">
                    A: 予約のキャンセルや変更は、相談予定日の前日までにご連絡いただければ可能です。オンラインシステムからもキャンセルや変更ができますので、ご利用ください。
                </div>

            </div>
            <Footer />
        </div>
    );
}
export default Faq;