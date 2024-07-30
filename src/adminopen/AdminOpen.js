// Import Modules
import React, { useState, useEffect, useCallback } from 'react';
import { useCookies } from 'react-cookie';
import { getApiUrl } from '../GetApiUrl';

//Import StyleSheets
import '../common/Form.css';
import './AdminOpen.css';

//Import Component
import StartComfirm from '../common/StartConfirm';
import AdmHeader from '../common/AdminHeader';

function AdminOpen() {
    const [cookie] = useCookies();
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showConfirm, setShowConfirm] = useState(false);
    const [selectedReservation, setSelectedReservation] = useState(null);

    // 停止解除の処理
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

    if (cookie.admin != null) {
        //予約停止管理の表示
        return (
            <>
                <AdmHeader />
                <div className="data-container">
                    <h2>予約停止の管理</h2>
                    {loading && <p>Loading...</p>}
                    {error && <p>Error: {error.message}</p>}
                    {data.length > 0 && (
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
                                {data.map((row, index) => (
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
}

export default AdminOpen;