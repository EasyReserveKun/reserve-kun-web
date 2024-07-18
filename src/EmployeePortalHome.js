import React from 'react';
import './EmployeePortalHome.css'; // スタイルシートをインポートする
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarAlt, faBan, faList } from '@fortawesome/free-solid-svg-icons'; // 使用するアイコンをインポートする
import AdmHeader from './AdmHeader'; // ヘッダーコンポーネントをインポートする

const EmployeePortalHome = () => {
  if (!(sessionStorage.getItem('AdName') == null)) {
    return (
      <>
        <AdmHeader />
        <div className="employee-portal-home">
          {/* メインコンテンツ */}
          <main className="main-content">
            <section className="welcome-section">
              <h1>ようこそ、<br></br>Ace 従業員ポータルへ</h1>
              <p>ここでは便利なツールや社内ニュースをご利用いただけます。</p>
            </section>

            <section className="tools-section">
              <h2>便利なツール</h2>
              <div className="tools-list">
                <a href="AdminPage" className="tool-item">
                  <div className="icon">
                    <FontAwesomeIcon icon={faCalendarAlt} size="4x" />
                  </div>
                  <div className="tool-info">
                    <h3>予約停止 <br></br>(日時選択)</h3>
                    <p>予約を日時を選択して停止する機能です。</p>
                  </div>
                </a>
                <a href="#stop-reservation-now" className="tool-item">
                  <div className="icon">
                    <FontAwesomeIcon icon={faBan} size="4x" />
                  </div>
                  <div className="tool-info">
                    <h3>予約即時停止</h3>
                    <p>予約を即時停止する機能です。</p>
                  </div>
                </a>
                <a href="ReservationList" className="tool-item">
                  <div className="icon">
                    <FontAwesomeIcon icon={faList} size="4x" />
                  </div>
                  <div className="tool-info">
                    <h3>予約一覧表示</h3>
                    <p>予約の一覧を見れる機能です。</p>
                  </div>
                </a>
              </div>
            </section>

            <section className="news-section">
              <h2>社内ニュース</h2>
              <div className="news-list">
                <div className="news-item">
                  <h3>NEWプロジェクトがスタート！</h3>
                  <p>新しいプロジェクトが開始されました。詳細はポータル内のプロジェクト管理セクションで確認してください。</p>
                </div>
                <div className="news-item">
                  <h3>夏季休暇の申請期間が始まりました</h3>
                  <p>夏季休暇の申請期間が始まりました。申請をお忘れなく。</p>
                </div>
                <div className="news-item">
                  <h3>給与明細の更新</h3>
                  <p>2024年7月の給与明細が更新されました。詳細は給与明細セクションで確認してください。</p>
                </div>
                {/* 他のニュースアイテム */}
              </div>
            </section>
          </main>
        </div>
      </>
    );
  } else {
    return (
      <div className="no-access">
        <h1>アクセス権限がありません</h1>
        <p>このページを表示するための権限がありません。管理者にお問い合わせください。</p>
        <a href="/" className="home-button">ホームページに戻る</a>
      </div>
    );
  }
};

export default EmployeePortalHome;
