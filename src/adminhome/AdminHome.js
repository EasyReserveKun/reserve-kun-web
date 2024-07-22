import React from 'react';
import './AdminHome.css';
import AdmHeader from '../common/AdminHeader';

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
                  <a href="/admin/close">
                    <div className="icon">
                      <i className="bi bi-calendar" style={{ fontSize: '4rem' }}></i>
                    </div>
                    <div className="tool-info">
                      <h3>予約停止 <br />(日時選択)</h3>
                    </div>
                  </a>
                </div>
                <div className="tool-item">
                  <a href="/admin/closeall">
                    <div className="icon">
                      <i className="bi bi-x-circle" style={{ fontSize: '4rem' }}></i>
                    </div>
                    <div className="tool-info">
                      <h3>予約即時停止</h3>
                    </div>
                  </a>
                </div>
                <div className="tool-item">
                  <a href="/admin/list">
                    <div className="icon">
                      <i className="bi bi-list" style={{ fontSize: '4rem' }}></i>
                    </div>
                    <div className="tool-info">
                      <h3>予約一覧表示</h3>
                    </div>
                  </a>
                </div>
                <div className="tool-item">
                  <a href="/admin/open">
                    <div className="icon">
                      <i className="bi bi-unlock" style={{ fontSize: '4rem' }}></i>
                    </div>
                    <div className="tool-info">
                      <h3>予約停止解除</h3>
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
