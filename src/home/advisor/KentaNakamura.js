// KentaNakamura.js

import React from 'react';
import './Advisor.css';

import Footer from '../../common/Footer';
import Header from '../../common/Header';
import Toolbar from '../../common/Toolbar';

function KentaNakamura() {
  const profile = {
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


export default KentaNakamura;