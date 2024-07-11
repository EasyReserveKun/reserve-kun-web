// MisakiTakahashi.js

import React from 'react';
import './Advisor.css';

import Footer from '../../common/Footer';
import Header from '../../common/Header';
import Toolbar from '../../common/Toolbar';

function MisakiTakahashi() {
  const profile = {
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


export default MisakiTakahashi;
