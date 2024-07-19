import React from 'react';
import './EmployeePortalHome.css'; // スタイルシートをインポートする
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarAlt, faBan, faList, faUnlockAlt } from '@fortawesome/free-solid-svg-icons'; // 使用するアイコンをインポートする
import AdmHeader from './AdmHeader'; // ヘッダーコンポーネントをインポートする

const EmployeePortalHome = () => {
  if (!(sessionStorage.getItem('AdName') == null)) {
    return (
      <>
        <AdmHeader />
        <div className="employee-portal-home">
          <main className="admmain-content">
            <section className="welcome-section">
              <h1>ようこそ、<br />Ace 従業員ポータルへ</h1>
              <p>ここでは便利なツールや社内ニュースをご利用いただけます。</p>
            </section>

            <section className="tools-section">
              <h2>便利なツール</h2>
              <div className="tools-list">
                <div className="tool-item">
                  <a href="AdminPage">
                    <div className="icon">
                      <FontAwesomeIcon icon={faCalendarAlt} size="4x" />
                    </div>
                    <div className="tool-info">
                      <h3>予約停止 <br />(日時選択)</h3>
                      <p>日時選択で予約を停止。</p>
                    </div>
                  </a>
                </div>
                <div className="tool-item">
                  <a href="#stop-reservation-now">
                    <div className="icon">
                      <FontAwesomeIcon icon={faBan} size="4x" />
                    </div>
                    <div className="tool-info">
                      <h3>予約即時停止</h3>
                      <p>予約の受付を即時停止。</p>
                    </div>
                  </a>
                </div>
                <div className="tool-item">
                  <a href="ReservationList">
                    <div className="icon">
                      <FontAwesomeIcon icon={faList} size="4x" />
                    </div>
                    <div className="tool-info">
                      <h3>予約一覧表示</h3>
                      <p>予約の一覧を見る。</p>
                    </div>
                  </a>
                </div>
                <div className="tool-item">
                  <a href="/ReactivationPage">
                    <div className="icon">
                      <FontAwesomeIcon icon={faUnlockAlt} size="4x" />
                    </div>
                    <div className="tool-info">
                      <h3>予約停止解除</h3>
                      <p>予約停止を解除する。</p>
                    </div>
                  </a>
                </div>
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
