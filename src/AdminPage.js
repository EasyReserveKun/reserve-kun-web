import React, { useState, useEffect } from 'react';
import { getApiUrl } from './GetApiUrl';
import './common/Form.css';
import './AdminPage.css';
import Header from './common/Header';
import Footer from './common/Footer';
import Warn from './common/Warn';

function AdminPage() {
    const [date, setDate] = useState('');
    const [time, setTime] = useState('');
    const [employeeId, setEmployeeId] = useState('');
    const [reservedTimes, setReservedTimes] = useState([]);
    const [warnText, setWarnText] = useState("");
    const [showWarn, setShowWarn] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            if (date && employeeId) {
                await fetchReservedTimes();
            }
        };
        fetchData();
    }, [date, employeeId]);

    const fetchReservedTimes = async () => {
        const requestData = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ date, eid: employeeId })
        };

        try {
            const response = await fetch(getApiUrl() + "/reserve/available", requestData);
            if (response.ok) {
                const data = await response.json();
                setReservedTimes(data);
                console.log('Reserved times:', data); // デバッグ用
            } else {
                console.error('Fetch Error:', response.statusText);
                setReservedTimes([]); // Fetchが失敗した場合はreservedTimesをクリア
            }
        } catch (error) {
            console.error('Fetch Error:', error);
            setReservedTimes([]); // Fetchがエラーを投げた場合はreservedTimesをクリア
        }
    };

    const handleDateChange = (event) => {
        const selectedDate = event.target.value;
        setDate(selectedDate);
    };

    const handleEmployeeChange = (event) => {
        const selectedEmployeeId = event.target.value;
        setEmployeeId(selectedEmployeeId);
    };

    const handleTimeChange = (event) => {
        setTime(event.target.value);
    };

    const stop = async () => {
        const requestData = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ date, eid: employeeId, time, cid: sessionStorage.getItem('AdName') })
        };

        const responce = await fetch("http://localhost:8080/employee/stop", requestData);
        const data = await responce.json();

        if (data.status === "Success") {
            setWarnText("停止に成功しました")
            setShowWarn(true);
            await fetchReservedTimes();
        } else if (data.status === "Duplicated") {
            await setWarnText("その時間はすでに予約されました");
            setShowWarn(true);
            await fetchReservedTimes();
        } else if (data.status === "Doubled") {
            await setWarnText("その時間はあなたはすでに予約しています");
            setShowWarn(true);
        }
    };

    const renderTimeButtons = () => {
        const buttons = [];

        for (let hour = 10; hour <= 19; hour++) {
            const timeSlot = `${hour}:00`;
            const isReserved = reservedTimes.includes(timeSlot);
            const buttonClass = isReserved ? 'gray-button' : 'red-button';

            buttons.push(
                <div key={hour} className="col-lg-2 col-md-3 col-4">
                    <button
                        type="button"
                        onClick={handleTimeChange}
                        className={buttonClass}
                        value={timeSlot}
                        disabled={isReserved}
                    >
                        {timeSlot}～
                    </button>
                </div>
            );
        }

        return buttons;
    };

    return (
        <>
            <Header />
            <form className="admin-form">
                <Warn text={warnText} showWarn={showWarn} setShowWarn={setShowWarn} />
                <h2 className="reserve-stop">予約を停止する</h2>
                <div className="form-group">
                    <label htmlFor="date">日付:</label>
                    <input
                        type="date"
                        id="date"
                        value={date}
                        onChange={handleDateChange}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="employeeId">従業員:</label>
                    <select
                        id="employeeId"
                        value={employeeId}
                        onChange={handleEmployeeChange}
                        required
                    >
                        <option value="">選択してください</option>
                        <option value="1">田中太郎</option>
                        <option value="2">佐藤花子</option>
                        <option value="3">鈴木一郎</option>
                        <option value="4">高橋美咲</option>
                        <option value="5">中村健太</option>
                    </select>
                </div>
                <div className="form-group">
                    <label htmlFor="time">時間:</label>
                    <div className="col-13">
                        <input
                            type="text"
                            id="time"
                            name="time"
                            value={time}
                            placeholder="ボタンで時間を指定してください"
                            className="form-control"
                        />
                    </div>
                    <div className="row">
                        {renderTimeButtons()}
                    </div>
                </div>
                <button type="button" onClick={stop} className="submit-button">予約を停止</button>
            </form>
            <Footer />
        </>
    );
}

export default AdminPage;