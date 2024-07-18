// Import Modules
import React, { useState } from 'react';


// Import StyleSheets
import './common/Form.css';
import './AdminPage.css';


// Import Components

import Footer from './common/Footer';
import AdmHeader from './AdmHeader';


function AdminPage() {
    const [date, setDate] = useState('');
    const [time, setTime] = useState('');
    const [employeeId, setEmployeeId] = useState('');

    // Function to block reservation
    const blockReservation = async (blockData) => {
        try {
            const response = await fetch('/api/block-reservation', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(blockData),
            });

            if (response.ok) {
                alert('予約が停止されました');
            } else {
                alert('予約停止に失敗しました');
            }
        } catch (error) {
            console.error('エラーが発生しました:', error);
            alert('予約停止に失敗しました');
        }
    };

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();

        const blockData = {
            date,
            time,
            employeeId,
            isBlocked: true
        };

        blockReservation(blockData);
    };

    // Render time buttons
    const renderTimeButtons = () => {
        const buttons = [];

        // Create buttons from 10:00 to 19:00
        for (let hour = 10; hour <= 19; hour++) {
            const time = `${hour}:00`;

            buttons.push(
                
                <button
                    key={hour}
                    type="button"
                    onClick={() => setTime(time)}
                    className="time-button"
                    style={{ marginRight: '10px' , marginTop: '10px' }} // ボタン間の余白を設定
                >
                    {time} ～
                </button>
            );
        }

        return buttons;
    };

    return (
        <>
            <AdmHeader />
            <form onSubmit={handleSubmit} className="admin-form">
                <h2 className="reserve-stop">予約を停止する</h2>
                <div className="form-group">
                    <label htmlFor="date">日付:</label>
                    <input
                        type="date"
                        id="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="time">時間:</label>
                    <div className="time-buttons">
                        {renderTimeButtons()}
                    </div>
                </div>
                <div className="form-group">
                    <label htmlFor="employeeId">従業員:</label>
                    <select
                        id="employeeId"
                        value={employeeId}
                        onChange={(e) => setEmployeeId(e.target.value)}
                        required
                    >
                        <option value="all">全員</option>
                        <option value="1">田中太郎</option>
                        <option value="2">佐藤花子</option>
                        <option value="3">鈴木一郎</option>
                        <option value="4">高橋美咲</option>
                        <option value="5">中村健太</option>
                    </select>
                </div>
                <button type="submit" className="submit-button">予約を停止</button>
            </form>
            <Footer />
        </>
    );
}

export default AdminPage;
