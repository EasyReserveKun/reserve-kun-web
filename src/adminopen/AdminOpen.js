// AdminOpen.js
import React, { useState, useEffect, useCallback } from 'react';
import { useCookies } from 'react-cookie';
import { getApiUrl } from '../GetApiUrl';
import '../common/Form.css';
import './AdminOpen.css';
import StartComfirm from '../common/StartConfirm'; // 修正：StartConfirmのインポート

import AdmHeader from '../common/AdminHeader';

function AdminOpen() {
    const [cookie] = useCookies();
    const [data, setData] = useState([]); // データを保存するための状態
    const [loading, setLoading] = useState(true); // データ取得中のローディング状態
    const [error, setError] = useState(null); // エラーを保存するための状態
    const [showConfirm, setShowConfirm] = useState(false); // モーダル表示の状態
    const [selectedReservation, setSelectedReservation] = useState(null); // 選択された予約情報

    // キャンセル操作を行う関数
    const cancelReservation = async (date, time, eid) => {
        const requestData = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ date, time, eid }) // 必要な情報をリクエストボディに含める
        };

        try {
            const response = await fetch(getApiUrl() + "/reserve/cancel", requestData);
            if (response.ok) {
                const data = await response.text();
                console.log(data);
                // キャンセル成功後にデータを再取得してテーブルを更新
                fetchReservedTimes();
                setShowConfirm(false); // モーダルを閉じる
            } else {
                throw new Error(response.statusText);
            }
        } catch (error) {
            console.error('Cancel Error:', error);
            setError(error); // エラーを状態に保存
        }
    };

    // データ取得関数
    const fetchReservedTimes = useCallback(async () => {
        const requestData = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ })
        };

        try {
            const response = await fetch(getApiUrl() + "/reserve/unavailable", requestData);
            if (response.ok) {
                const result = await response.json();
                console.log(result);
                // CSV文字列をパースして2次元配列に変換
                const parsedData = result.map(item => item.split(','));
                setData(parsedData); // データを状態に保存
                setLoading(false); // ローディング状態を解除
            } else {
                throw new Error(response.statusText);
            }
        } catch (error) {
            setError(error); // エラーを状態に保存
            setLoading(false); // ローディング状態を解除
        }
    }, []);

    useEffect(() => {
        fetchReservedTimes(); // コンポーネントがマウントされたときにデータを取得
    }, [fetchReservedTimes]);

    const handleCancelClick = (date, time, eid) => {
        setSelectedReservation({ date, time, eid });
        setShowConfirm(true); // モーダルを表示
    };

    const handleConfirm = () => {
        if (selectedReservation) {
            cancelReservation(selectedReservation.date, selectedReservation.time, selectedReservation.eid);
        }
    };

    const handleCancel = () => {
        setShowConfirm(false); // モーダルを閉じる
    };

    if (cookie.admin != null) {
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
                                        <td>{row[7]}</td> {/* ここは従業員のデータに合わせてください */}
                                        <td>
                                            <button 
                                                className="cancel-button" 
                                                onClick={() => handleCancelClick(row[0], row[1], row[2])} // 日付、時間、従業員名を渡す
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
