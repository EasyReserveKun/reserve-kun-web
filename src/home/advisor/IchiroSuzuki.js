// IchiroSuzuki.js

import React from 'react';
import { useNavigate } from 'react-router-dom';

import './Advisor.css';
import Footer from '../../common/Footer';
import Header from '../../common/Header';
import Toolbar from '../../common/Toolbar';
import AdvisorProfile from './AdvisorProfile';

function IchiroSuzuki() {
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
        img: "suzukiichiro",
        name: "鈴木 一郎",
        title: "介護のスーパーバイザー",
        expertise: "専門家プロフィール",
        description:
            "鈴木一郎は25年のキャリアを持つ介護福祉士で、高齢者ケアや施設運営の専門知識が豊富です。特に認知症ケアや在宅介護の支援に力を入れています。",
        achievements: {
            "1995年": "介護福祉士資格取得",
            "2000年": "高齢者施設で介護部門の責任者に就任",
            "2010年": "認知症ケア専門研修修了",
            "2015年": "在宅介護サポートプロジェクトを立ち上げ",
            "2020年": "地域介護サポート賞受賞"
        },
        services: {
            "認知症ケア": "認知症患者のためのケアプランの作成",
            "在宅介護支援": "在宅介護に必要な設備やサポート体制の提案",
            "介護施設の選択": "家族に最適な介護施設の紹介と手続きサポート"
        },
        testimonials: [
            {
                customer: "Iさん",
                comment: "鈴木さんの助言で、認知症の母のケアが格段に楽になりました。いつも親身に対応してくれて感謝しています。"
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

export default IchiroSuzuki;
