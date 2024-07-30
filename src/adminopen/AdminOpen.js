import React, { useState, useEffect, useCallback } from 'react';
import { useCookies } from 'react-cookie';
import { getApiUrl } from '../GetApiUrl';
import '../common/Form.css';
import './AdminOpen.css';
import StartComfirm from '../common/StartConfirm';
import AdmHeader from '../common/AdminHeader';

function AdminOpen() {
    const [cookie] = useCookies();
    const [data, setData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showConfirm, setShowConfirm] = useState(false);
    const [selectedReservation, setSelectedReservation] = useState(null);
    const [filterDate, setFilterDate] = useState('');
    const [filterEmployee, setFilterEmployee] = useState('all');

    const cancelReservation = async (date, time, eid) => {
        const requestData = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ date, time, eid })
        };

        try {
            const response = await fetch(getApiUrl() + "/reserve/cancel", requestData);
            if (response.ok) {
                const data = await response.text();
                console.log(data);
                fetchReservedTimes();
                setShowConfirm(false);
            } else {
                throw new Error(response.statusText);
            }
        } catch (error) {
            console.error('Cancel Error:', error);
            setError(error);
        }
    };

    const fetchReservedTimes = useCallback(async () => {
        const requestData = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({})
        };

        try {
            const response = await fetch(getApiUrl() + "/reserve/unavailable", requestData);
            if (response.ok) {
                const result = await response.json();
                console.log(result);
                const parsedData = result.map(item => item.split(','));
                setData(parsedData);
                setFilteredData(parsedData);
                setLoading(false);
            } else {
                throw new Error(response.statusText);
            }
        } catch (error) {
            setError(error);
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchReservedTimes();
    }, [fetchReservedTimes]);

    const handleFilterChange = useCallback(() => {
        let filtered = data;
        if (filterDate) {
            filtered = filtered.filter(row => row[0].includes(filterDate));
        }
        if (filterEmployee !== 'all') {
            filtered = filtered.filter(row => row[7].includes(filterEmployee)); // 従業員名でフィルタリング
        }
        setFilteredData(filtered);
    }, [data, filterDate, filterEmployee]);

    useEffect(() => {
        handleFilterChange();
    }, [filterDate, filterEmployee, handleFilterChange]);

    const handleCancelClick = (date, time, eid) => {
        setSelectedReservation({ date, time, eid });
        setShowConfirm(true);
    };

    const handleConfirm = () => {
        if (selectedReservation) {
            cancelReservation(selectedReservation.date, selectedReservation.time, selectedReservation.eid);
        }
    };

    const handleCancel = () => {
        setShowConfirm(false);
    };

    return cookie.admin ? (
        <>
            <AdmHeader />
            <div className="data-container">
                <h2>予約停止の管理</h2>
                <p>以下の一覧は、予約の受付を停止している従業員です。「開始ボタン」で予約受付の停止を解除し、受付を開始します。</p>
                <div className="filter-container">
                    <input
                        type="date"
                        value={filterDate}
                        onChange={(e) => setFilterDate(e.target.value)}
                        placeholder="日付で絞り込み"
                    />
                    <select
                        value={filterEmployee}
                        onChange={(e) => setFilterEmployee(e.target.value)}
                    >
                        <option value="all">全員</option>
                        <option value="田中太郎">田中太郎</option>
                        <option value="佐藤花子">佐藤花子</option>
                        <option value="鈴木一郎">鈴木一郎</option>
                        <option value="高橋美咲">高橋美咲</option>
                        <option value="中村健太">中村健太</option>
                    </select>
                </div>
                {loading && <p className="loading">データを読み込み中...</p>}
                {error && <p className="error">エラー: {error.message}</p>}
                {filteredData.length > 0 && (
                    <table className="data-table">
                        <thead>
                            <tr>
                                <th>日付</th>
                                <th>時間</th>
                                <th>従業員</th>
                                <th>受付開始</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredData.map((row, index) => (
                                <tr key={index}>
                                    <td>{row[0]}</td>
                                    <td>{row[1]}</td>
                                    <td>{row[7]}</td>
                                    <td>
                                        <button
                                            className="cancel-button"
                                            onClick={() => handleCancelClick(row[0], row[1], row[2])}
                                        >
                                            開始
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
            {showConfirm && (
                <StartComfirm
                    onCancel={handleCancel}
                    onConfirm={handleConfirm}
                />
            )}
        </>
    ) : (
        <div className="no-access">
            <h1>アクセス権限がありません</h1>
            <p>このページを表示するための権限がありません。管理者にお問い合わせください。</p>
            <a href="/" className="home-button">ホームページに戻る</a>
        </div>
    );
}

export default AdminOpen;
