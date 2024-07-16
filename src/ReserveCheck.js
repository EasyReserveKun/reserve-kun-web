import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from './common/Header.js';
import Footer from './common/Footer.js';
import Toolbar from './common/Toolbar.js';
import DeleteComfirm from './common/DeleteComfirm.js'; // 正しいファイル名でインポート
import './ReserveCheck.css'; // CSSファイルをインポート

function ReserveCheck() {
    const navigate = useNavigate();
    const [data, setData] = useState([]);
    const [preData, setPreData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState('current'); // 初期値として「本日以降の予約」を表示
    const [showDeleteModal, setShowDeleteModal] = useState(false); // 確認モーダルの表示状態を管理
    const [selectedReservation, setSelectedReservation] = useState(null); // 選択された予約情報を保持

    useEffect(() => {
        const fetchData = async () => {
            const requestData = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ cid: sessionStorage.getItem('AccountMail') })
            };

            try {
                const response = await fetch("http://localhost:8080/reserve/check", requestData);
                const jsonData = await response.json();

                const today = new Date().toISOString().split('T')[0]; 
                const filteredData = jsonData.filter(item => item.date >= today);
                const previousData = jsonData.filter(item => item.date < today);

                setData(filteredData); 
                setPreData(previousData);
                setLoading(false);
            } catch (error) {
                console.error('Fetch Error:', error);
                setLoading(false);
            }
        };

        fetchData();

    }, []);

    const returnReserve = () => {
        navigate('/');
        setTimeout(() => {
            window.scrollTo({
                top: 85,
                behavior: 'smooth',
            });
        });
    };

    const handleTabChange = (tab) => {
        setActiveTab(tab);
    };

    const openDeleteModal = (date, time, eid) => {
        setSelectedReservation({ date, time, eid });
        setShowDeleteModal(true);
    };

    const cancelReservation = async () => {
        const { date, time, eid } = selectedReservation;
        const requestData = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ date, time, eid })
        };
    
        try {
            const response = await fetch("http://localhost:8080/reserve/cancel", requestData);
            if (response.ok) {
                // 成功した場合の処理
                // 例えば、データを更新してリフレッシュするなど
                const updatedData = data.filter(item => !(item.date === date && item.time === time && item.eid === eid));
                setData(updatedData);
                setShowDeleteModal(false); // モーダルを閉じる
            } else {
                console.error('キャンセルに失敗しました');
            }
        } catch (error) {
            console.error('Fetch Error:', error);
        }
    };

    const closeDeleteModal = () => {
        setShowDeleteModal(false);
    };

    return (
        <div className="reserve-check-container">
            <Header />
            <main className="main-content">
                {loading ? (
                    <p>データを読み込んでいます...</p>
                ) : (
                    <>
                        <div className="tab-buttons">
                            <h2 className="tab-title">予約情報</h2>
                            <div className={`tab-button ${activeTab === 'current' ? 'active' : ''}`} onClick={() => handleTabChange('current')}>
                                本日以降の予約
                            </div>
                            <div className={`tab-button ${activeTab === 'previous' ? 'active' : ''}`} onClick={() => handleTabChange('previous')}>
                                以前の予約
                            </div>
                        </div>
    
                        {activeTab === 'current' && data.length > 0 ? (
                            <table className="reservation-table">
                                <thead>
                                    <tr>
                                        <th>日付</th>
                                        <th>時間</th>
                                        <th>カテゴリー</th>
                                        <th>予約のキャンセル</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {data.map((item, index) => (
                                        <tr key={index}>
                                            <td>{item.date}</td>
                                            <td>{item.time}</td>
                                            <td>
                                                {
                                                    item.eid === "1" ? '不動産' :
                                                    item.eid === "2" ? 'おうちの修繕' :
                                                    item.eid === "3" ? '介護' :
                                                    item.eid === "4" ? '終活・相続' :
                                                    item.eid === "5" ? '車・保健・金融' :
                                                    ''
                                                }
                                            </td>
                                            <td>
                                                <button className="delete-button" onClick={() => openDeleteModal(item.date, item.time, item.eid)}>キャンセルする</button>
                                                {showDeleteModal && (
                                                    <DeleteComfirm
                                                        onCancel={closeDeleteModal}
                                                        onConfirm={cancelReservation}
                                                    />
                                                )}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        ) : activeTab === 'current' && data.length === 0 ? (
                            <p>本日以降の予約はありません。</p>
                        ) : (
                            <table className="reservation-table">
                                <thead>
                                    <tr>
                                        <th>日付</th>
                                        <th>時間</th>
                                        <th>カテゴリー</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {preData.map((item, index) => (
                                        <tr key={index}>
                                            <td>{item.date}</td>
                                            <td>{item.time}</td>
                                            <td>
                                                {
                                                    item.eid === "1" ? '不動産' :
                                                    item.eid === "2" ? 'おうちの修繕' :
                                                    item.eid === "3" ? '介護' :
                                                    item.eid === "4" ? '終活・相続' :
                                                    item.eid === "5" ? '車・保健・金融' :
                                                    ''
                                                }
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        )}
                    </>
                )}
            </main>
            <Footer />
            <Toolbar onClick={returnReserve} />
        </div>
    );
    
}

export default ReserveCheck;
