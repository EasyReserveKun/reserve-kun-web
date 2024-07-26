// TaroTanaka.js

import React from 'react';
import { useNavigate } from 'react-router-dom';

import './Advisor.css';
import Footer from '../../common/Footer';
import Header from '../../common/Header';
import Toolbar from '../../common/Toolbar';
import AdvisorProfile from './AdvisorProfile';

function TaroTanaka() {
    const navigate = useNavigate();

    const returnReserve = () => {
        navigate('/');  // トップページへ遷移
        setTimeout(() => {
            window.scrollTo({
                top: 85,  // スクロール位置をトップに設定
                behavior: 'smooth',
            });
        });
    };
    const profile = {
        img: "tanakataro",
        name: "田中 太郎",
        title: "不動産のスーパーバイザー",
        expertise: "専門家プロフィール",
        description:
            "田中太郎は30年以上の不動産業界経験を持つベテランです。土地や住宅の売買、賃貸、管理に関する豊富な知識を持ち、特に住宅ローンや資産運用のアドバイスに定評があります。",
        achievements: {
            "1990年": "不動産業界に入る",
            "1995年": "マイホームアドバイザー資格取得",
            "2000年": "田中不動産を設立",
            "2010年": "年間最優秀不動産アドバイザー受賞",
            "2020年": "不動産コンサルティング大賞受賞"
        },
        services: {
            "住宅の購入・売却": "市場調査から契約手続きまでの全般サポート",
            "賃貸物件の管理": "賃貸物件の管理やリノベーションの提案",
            "住宅ローンと資産運用": "最適なローンの選び方や資産運用のアドバイス"
        },
        testimonials: [
            {
                customer: "Fさん",
                comment: "田中さんのアドバイスでスムーズに家を売却できました。親身になってサポートしてくれて感謝しています。"
            }
        ]
    };

    return (
        <>
            <Header />
            <div className='homeLink'>
                <a href="/">ホーム&gt;</a>
                <a href="/TanakaTaro">田中太郎</a>
            </div>
            <AdvisorProfile profile={profile} />
            <Footer />
            <Toolbar onClick={returnReserve} />
        </>
    );
}

export default TaroTanaka;
