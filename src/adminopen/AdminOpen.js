import React, { useState, useEffect, useCallback } from 'react';
import { getApiUrl } from '../GetApiUrl';
import '../common/Form.css';
import '../common/AdminPage.css';

import AdmHeader from '../common/AdminHeader';
import Warn from '../common/Warn';
import LoadingSpinner from '../LoadingSpinner';

function AdminOpen() {
    const [date, setDate] = useState('');
    const [time, setTime] = useState('');
    const [employeeId, setEmployeeId] = useState('');
    const [reservedTimes, setReservedTimes] = useState(['10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00']);
    const [warnText, setWarnText] = useState("");
    const [showWarn, setShowWarn] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const fetchReservedTimes = useCallback(async () => {
        const requestData = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ date, eid: employeeId })
        };

        try {
            const response = await fetch(getApiUrl() + "/reserve/unavailable", requestData);
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
    }, [date, employeeId]);

    useEffect(() => {
        const fetchData = async () => {
            if (date && employeeId) {
                await fetchReservedTimes();
            }
        };
        fetchData();
    }, [date, employeeId, fetchReservedTimes]);

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
        if(date===""||employeeId===""||time===""){
            setWarnText("入力情報を確認してください");
            setShowWarn(true);
            return null;
        }
        setIsLoading(true);
        const requestData = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ date, eid: employeeId, time })
        };

        const response = await fetch(getApiUrl() + "/employee/reactivation", requestData);
        const data = await response.text();


        setIsLoading(false);
        setWarnText(data);
        setShowWarn(true);
        await fetchReservedTimes();
    };

    const renderTimeButtons = () => {
        const buttons = [];

        for (let hour = 10; hour <= 19; hour++) {
            const timeSlot = `${hour}:00`;
            const isReserved = reservedTimes.includes(timeSlot);
            const buttonClass = isReserved ? 'red-button' : 'gray-button';

            buttons.push(
                <div key={hour} className="col-lg-2 col-md-3 col-4">
                    <button
                        type="button"
                        onClick={handleTimeChange}
                        className={buttonClass}
                        value={timeSlot}
                        disabled={!(isReserved)}
                    >
                        {timeSlot}～
                    </button>
                </div>
            );
        }

        return (
            <div className="row  custom-row">
                {buttons}
                <div className="col-lg-2 col-md-3 col-4">
                    <button
                        type="button"
                        onClick={handleTimeChange}
                        className="red-button"
                        value="すべての時間"
                    >
                        すべて選択
                    </button>
                </div>
            </div>
        );
    };

    if (!(sessionStorage.getItem('AdName') == null)) {
        return (
            <>
                <AdmHeader />
                <div className='homeLink'>
                    <a href="/admin">ホーム&gt;</a>
                    <a href="/admin/open">停止の解除</a>
                </div>
                {isLoading && <LoadingSpinner />}
                <form className="admin-form">
                    <Warn text={warnText} showWarn={showWarn} setShowWarn={setShowWarn} />
                    <h2 className="batch-open-title">予約の停止を解除する</h2>
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
                    <button type="button" onClick={stop} className="opensubmit-button">予約停止の解除</button>
                </form>
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
