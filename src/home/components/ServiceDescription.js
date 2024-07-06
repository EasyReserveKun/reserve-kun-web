import React from 'react';
import './ServiceDescription.css'


const ServiceDescription = () => {
  return (
    <div className="service-description-container">
      <div className='service-title'>
        <h3>新サービスのご案内</h3>
      </div>
      <p className="service-description">
        Aceスーパーマーケット東雲南店では、皆さまの日常のちょっとしたお困りごとをサポートするため、コンシェルジュデスクを開設しました。<br />
        不動産や修繕、介護、相続、車、保険、金融など、各分野の専門家が親身にご相談に応じます。
        スマホから簡単に予約できる便利なオンラインシステムもご利用いただけます。<br />
        コンシェルジュデスクの営業時間は10:00〜20:00で、1回のご相談は1時間です。
        どうぞお気軽にご利用ください。
      </p>
    </div>
  );
}

export default ServiceDescription;
