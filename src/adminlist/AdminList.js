// Import Modules
import React, { useState, useEffect } from 'react';
import { useCookies } from 'react-cookie';
import { getApiUrl } from '../GetApiUrl';

//Import StyleSheets
import './AdminList.css';

//Import Component
import AdmHeader from '../common/AdminHeader';
import DeleteComfirm from '../common/DeleteComfirm';

const ReservationList = () => {
    // 今日の日付を初期値として設定する関数
    const getTodayDate = () => {
        const today = new Date();
        const year = today.getFullYear();
        const month = String(today.getMonth() + 1).padStart(2, '0');
        const date = String(today.getDate()).padStart(2, '0');
        return `${year}-${month}-${date}`;
    };

    // 今日の日付が過去かどうかをチェックする関数
    const isPastDate = (date) => {
        const today = new Date();
        const inputDate = new Date(date);
        return inputDate < today;
    };

    const [reservations, setReservations] = useState({ upcoming: [] });
    const [loading, setLoading] = useState(true);
    const [employeeFilter, setEmployeeFilter] = useState('all');
    const [selectedDate, setSelectedDate] = useState(getTodayDate());
    const [cookie, ,] = useCookies();
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [selectedReservation, setSelectedReservation] = useState(null);

    const fetchData = async (employeeFilter, selectedDate) => {
        const requestData = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ eid: employeeFilter })
        };

        try {
            const response = await fetch(getApiUrl() + "/reserve/employeecheck", requestData);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const jsonData = await response.json();
            const upcomingReservations = jsonData.filter(item => item.date);

            if (selectedDate) {
                const filteredByDate = upcomingReservations.filter(reservation => reservation.date === selectedDate);
                setReservations({ upcoming: filteredByDate });
            } else {
                setReservations({ upcoming: upcomingReservations });
            }
        } catch (error) {
            console.error('Fetch Error:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData(employeeFilter, selectedDate);
    }, [employeeFilter, selectedDate]);

    const handleDateChange = (event) => {
        setSelectedDate(event.target.value);
    };

    const openDeleteModal = (reservation) => {
        setSelectedReservation(reservation);
        setShowDeleteModal(true);
    };

    const closeDeleteModal = () => {
        setShowDeleteModal(false);
    };

    //予約キャンセルの処理
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
            const response = await fetch(getApiUrl() + "/reserve/cancel", requestData);
            if (response.ok) {
                fetchData(employeeFilter, selectedDate);
                closeDeleteModal();
            } else {
                console.error('キャンセルに失敗しました');
            }
        } catch (error) {
            console.error('Fetch Error:', error);
        }
    };

    //予約状況の一覧表示
    if (cookie.admin != null) {
        return (
            <>
                <AdmHeader />
                <div className='homeLink'>
                    <a href="/admin">ホーム&gt;</a>
                    <a href="/admin/list">予約一覧</a>
                </div>
                <div className="reservation-list">
                    <div className="filters-container">
                        <div className="filter-group employee-filter">
                            <div className="filter-group date-filter">
                                <label htmlFor="date-filter">日付選択：</label>
                                <input
                                    type="date"
                                    id="date-filter"
                                    value={selectedDate}
                                    onChange={handleDateChange}
                                />
                                <label htmlFor="employee-filter">従業員選択：</label>
                                <select
                                    id="employee-filter"
                                    onChange={e => setEmployeeFilter(e.target.value)}
                                    value={employeeFilter}
                                >
                                    <option value="all">全員</option>
                                    <option value="1">田中太郎</option>
                                    <option value="2">佐藤花子</option>
                                    <option value="3">鈴木一郎</option>
                                    <option value="4">高橋美咲</option>
                                    <option value="5">中村健太</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    {loading ? (
                        <p className="loading">Loading...</p>
                    ) : (
                        <div className="reservation-section">
                            <h2>予約</h2>
                            {reservations.upcoming.length > 0 ? (
                                <div className="reservation-items-container">
                                    {reservations.upcoming.map((reservation, index) => (
                                        <div key={index} className="reservation-item">
                                            <p><span className="label">日付：</span><span className="value">{reservation.date}</span></p>
                                            <p><span className="label">時間：</span><span className="value">{reservation.time}</span></p>
                                            <p><span className="label">従業員名：</span><span className="value">{reservation.ename}</span></p>
                                            <p><span className="label">顧客名：</span><span className="value">{reservation.cname}</span></p>
                                            <p><span className="label">連絡先：</span><span className="value">{reservation.cid}</span></p>
                                            <p><span className="label">備考欄：</span><span className="value">{reservation.etc}</span></p>
                                            <button
                                                className={`delete-button ${isPastDate(reservation.date) ? 'disabled' : ''}`}
                                                onClick={() => !isPastDate(reservation.date) && openDeleteModal(reservation)}
                                                disabled={isPastDate(reservation.date)}
                                            >
                                                キャンセル
                                            </button>
                                            {showDeleteModal && (
                                                <DeleteComfirm
                                                    onCancel={closeDeleteModal}
                                                    onConfirm={cancelReservation}
                                                />
                                            )}
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <p>予約はありません。</p>
                            )}
                        </div>
                    )}
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

export default ReservationList;
