import React, { useState, useEffect } from 'react';
import AdmHeader from '../common/AdminHeader';
import './AdminList.css';
import { getApiUrl } from '../GetApiUrl';

const ReservationList = () => {
    const [reservations, setReservations] = useState({ upcoming: [] });
    const [loading, setLoading] = useState(true);
    const [employeeFilter, setEmployeeFilter] = useState('all');
    const [selectedDate, setSelectedDate] = useState('');

    const fetchData = async (employeeFilter, selectedDate) => {
        const requestData = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ eid: employeeFilter })
        };

        try {
            const response = await fetch(getApiUrl() + "/reserve/employeeCheck", requestData);

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const jsonData = await response.json();
            console.log(jsonData);

            // 予約データをフィルタリング
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
        const selected = event.target.value;
        setSelectedDate(selected);
    };

    if (sessionStorage.getItem('AdName')) {
        return (
            <>
                <AdmHeader />
                <div className="reservation-list">
                    <div className="filters-container">
                        <div className="filter-group employee-filter">
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
                        <div className="filter-group date-filter">
                            <label htmlFor="date-filter">日付選択：</label>
                            <input
                                type="date"
                                id="date-filter"
                                value={selectedDate}
                                onChange={handleDateChange}
                            />
                        </div>
                    </div>

                    {loading && <p className="loading">Loading...</p>}

                    
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
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <p>予約はありません。</p>
                        )}
                    </div>
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
