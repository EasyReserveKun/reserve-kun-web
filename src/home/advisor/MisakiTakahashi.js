// MisakiTakahashi.js

import React from 'react';
import { useNavigate } from 'react-router-dom';

import './Advisor.css';
import Footer from '../../common/Footer';
import Header from '../../common/Header';
import Toolbar from '../../common/Toolbar';
import AdvisorProfile from './AdvisorProfile';

function MisakiTakahashi() {
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
        img: "takahashimisaki",
        name: "高橋 美咲",
        title: "終活・相続のスーパーバイザー",
        expertise: "専門家プロフィール",
        description:
            "高橋美咲はファイナンシャルプランナー資格を持ち、15年以上の経験を誇る終活や相続の専門家です。遺言書作成や相続税対策、財産分割の相談に応じます。",
        achievements: {
            "2005年": "ファイナンシャルプランナー資格取得",
            "2008年": "高橋相続コンサルティング設立",
            "2012年": "遺産分割協議会のアドバイザーに就任",
            "2016年": "相続税対策セミナー講師",
            "2021年": "終活サポート優秀賞受賞"
        },
        services: {
            "遺言書作成": "法的に有効な遺言書の作成支援",
            "相続税対策": "最適な相続税対策のアドバイス",
            "財産分割の相談": "公平な財産分割のプラン作成"
        },
        testimonials: [
            {
                customer: "Lさん",
                comment: "高橋さんのサポートで終活を安心して進められました。家族みんなが納得できるプランを提案してくれました。"
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

export default MisakiTakahashi;
