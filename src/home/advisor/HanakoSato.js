// HanakoSato.js

import React from 'react';
import { useNavigate } from 'react-router-dom';

import './Advisor.css';
import Footer from '../../common/Footer';
import Header from '../../common/Header';
import Toolbar from '../../common/Toolbar';
import AdvisorProfile from './AdvisorProfile';

function HanakoSato() {
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
        img: "satohanako",
        name: "佐藤 花子",
        title: "おうちの修繕のスーパーバイザー",
        expertise: "専門家プロフィール",
        description:
            "佐藤花子は建築士資格を持ち、20年以上のリフォーム業界での経験を持つプロフェッショナルです。設計から施工まで一貫してサポートし、省エネ改修やバリアフリーリフォームなどの最新技術とトレンドに精通しています。細部にまでこだわる丁寧な仕事が評判です。",
        achievements: {
            "2000年": "建築士資格取得",
            "2003年": "佐藤リフォームサービスを設立",
            "2010年": "地域リフォームコンテストで最優秀賞受賞",
            "2015年": "エコリフォーム推進キャンペーンに参加",
            "2020年": "バリアフリー住宅の設計で業界賞受賞"
        },
        services: {
            "屋根や外壁の修繕": "雨漏り対策や外壁の塗り替えについての相談",
            "キッチンやバスルームのリフォーム": "使いやすさとデザイン性を兼ね備えたリフォームプランの提案",
            "バリアフリー改修": "高齢者や障がい者向けの住宅改修プランの提供"
        },
        testimonials: [
            {
                customer: "Cさん",
                comment: "佐藤さんのおかげで、安心して住める家になりました。丁寧な説明と対応がとても良かったです。"
            }
        ]
    };

    return (
        <>
            <Header />
            <div className='homeLink'>
                <a href="/">ホーム&gt;</a>
                <a href="/satoHanako">佐藤花子</a>
            </div>
            <AdvisorProfile profile={profile} />
            <Footer />
            <Toolbar onClick={returnReserve} />
        </>
    );
}

export default HanakoSato;
