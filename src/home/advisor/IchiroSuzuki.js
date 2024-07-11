// IchiroSuzuki.js

import React from 'react';
import './Advisor.css';

import Footer from '../../common/Footer';
import Header from '../../common/Header';
import Toolbar from '../../common/Toolbar';
function IchiroSuzuki() {
  const profile = {
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
      <div className="profile">
        <h1>{profile.name}</h1>
        <div className="title">{profile.title}</div>

        <div className="section">
          <h2>{profile.expertise}</h2>
          <p>{profile.description}</p>
        </div>

        <div className="section">
          <h2>実績と経歴</h2>
          <div className="achievements">
            {Object.entries(profile.achievements).map(([year, achievement]) => (
              <div key={year}><strong>{year}:</strong> {achievement}</div>
            ))}
          </div>
        </div>

        <div className="section">
          <h2>具体的な相談内容</h2>
          <div className="services">
            {Object.entries(profile.services).map(([service, description]) => (
              <div key={service}><strong>{service}:</strong> {description}</div>
            ))}
          </div>
        </div>

        <div className="section">
          <h2>お客様の声</h2>
          <div className="testimonials">
            {profile.testimonials.map((testimonial, index) => (
              <blockquote key={index}>
                <p>{testimonial.comment}- {testimonial.customer}</p>

              </blockquote>

            ))}

          </div>

        </div>

      </div>
      <Footer />
      <Toolbar />
    </>
  );
}


export default IchiroSuzuki;
