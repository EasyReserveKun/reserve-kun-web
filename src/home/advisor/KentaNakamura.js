// KentaNakamura.js

import React from 'react';
import { useNavigate } from 'react-router-dom';

import './Advisor.css';
import Footer from '../../common/Footer';
import Header from '../../common/Header';
import Toolbar from '../../common/Toolbar';
import AdvisorProfile from './AdvisorProfile';

function KentaNakamura() {
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
        img: "nakamurakenta",
        name: "中村 健太",
        title: "車や保険・金融のスーパーバイザー",
        expertise: "専門家プロフィール",
        description:
            "中村健太は20年以上の保険業界経験を持ち、自動車保険や生命保険、金融商品に精通したスーパーバイザーです。",
        achievements: {
            "2000年": "保険代理店でキャリアスタート",
            "2005年": "自動車保険専門アドバイザー資格取得",
            "2010年": "中村保険コンサルティング設立",
            "2015年": "生命保険見直しプロジェクトに参加",
            "2021年": "金融商品アドバイザー大賞受賞"
        },
        services: {
            "自動車保険": "最適な自動車保険の選び方と見直し",
            "生命保険": "家族構成に合わせた生命保険の提案",
            "資産運用": "リスク管理と資産運用のアドバイス"
        },
        testimonials: [
            {
                customer: "Oさん",
                comment: "中村さんのアドバイスで、保険の見直しができて大変助かりました。資産運用についても詳しく教えてもらえました。"
            }
        ]
    };

    return (
        <>
            <Header />
            <AdvisorProfile profile={profile} />
            <Footer />
            <Toolbar onClick={returnReserve} />
        </>
    );
}

export default KentaNakamura;
