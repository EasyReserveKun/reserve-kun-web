// ReservationList.js

import React, { useState, useEffect } from 'react';
import AdmHeader from './AdmHeader';
import './ReservationList.css';
const Reservations = () => {
    const [reservations, setReservations] = useState([]);
    const [loading, setLoading] = useState(true);
    const [employeeFilter, setEmployeeFilter] = useState(null); // null means show all employees

    useEffect(() => {
        // Simulate API call to fetch reservations
        const fetchReservations = async () => {
            try {
                // Replace with actual API call
                const response = await fetch('/api/reservations');
                const data = await response.json();
                setReservations(data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching reservations:', error);
            }
        };

        fetchReservations();
    }, []);

    // Filter reservations based on employee selection
    const filteredReservations = employeeFilter
        ? reservations.filter(reservation => reservation.employee === employeeFilter)
        : reservations;

    // Filter reservations based on date
    const today = new Date().toISOString().split('T')[0];
    const upcomingReservations = filteredReservations.filter(reservation => reservation.date >= today);
    const historyReservations = filteredReservations.filter(reservation => reservation.date < today);
    if (!(sessionStorage.getItem('AdName') == null)) {
        return (
            <>
                <AdmHeader />
                <div className="reservation-list">


                    {/* Employee filter dropdown */}
                    <div className="employee-filter">
                        <label htmlFor="employee-filter">従業員選択：</label>
                        <select
                            id="employee-filter"
                            onChange={e => setEmployeeFilter(e.target.value)}
                            value={employeeFilter || ''}
                        >
                            <option value="">全員</option>
                            <option value="Employee1">従業員1</option>
                            <option value="Employee2">従業員2</option>
                            <option value="Employee3">従業員3</option>
                            <option value="Employee4">従業員4</option>
                            <option value="Employee5">従業員5</option>
                        </select>
                    </div>

                    {/* Loading indicator */}
                    {loading && <p>Loading...</p>}

                    {/* Upcoming reservations */}
                    <div className="reservation-section">
                        <h2>今日以降の予約</h2>
                        {upcomingReservations.length > 0 ? (
                            upcomingReservations.map(reservation => (
                                <div key={reservation.id} className="reservation-item">
                                    <p>日付：{reservation.date}</p>
                                    <p>時間：{reservation.time}</p>
                                    <p>従業員名：{reservation.employee}</p>
                                    <p>顧客名：{reservation.customer}</p>
                                    <p>備考欄：{reservation.remarks}</p>
                                </div>
                            ))
                        ) : (
                            <p>今日以降の予約はありません。</p>
                        )}
                    </div>

                    {/* History reservations */}
                    <div className="reservation-section">
                        <h2>履歴</h2>
                        {historyReservations.length > 0 ? (
                            historyReservations.map(reservation => (
                                <div key={reservation.id} className="reservation-item">
                                    <p>日付：{reservation.date}</p>
                                    <p>時間：{reservation.time}</p>
                                    <p>従業員名：{reservation.employee}</p>
                                    <p>顧客名：{reservation.customer}</p>
                                    <p>備考欄：{reservation.remarks}</p>
                                </div>
                            ))
                        ) : (
                            <p>過去の予約はありません。</p>
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

export default Reservations;
