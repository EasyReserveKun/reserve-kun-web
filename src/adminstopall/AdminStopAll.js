// StopReservation.js

import React, { useState } from 'react';
import { getApiUrl } from '../GetApiUrl';
import Warn from '../common/Warn';
import './AdminStopAll.css';
import AdmHeader from '../common/AdminHeader';


function AdminStopAll() {
    const [employeeId, setEmployeeId] = useState('');
    const [warnText, setWarnText] = useState('');
    const [showWarn, setShowWarn] = useState(false);

    const stopAll = async () => {
        const requestData = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ eid: employeeId })
        };

        try {
            const response = await fetch(getApiUrl() + "/employee/stopAll", requestData);
            const data = await response.text();

                if (data === "受付を停止します") {
                    setWarnText("受付を停止します");
                    setShowWarn(true);
                } else{
                    setWarnText("エラーが発生しました");
                    setShowWarn(true);
                }
    
        } catch (error) {
            console.error('Fetch Error:', error);
            setWarnText("予約の停止に失敗しました");
            setShowWarn(true);
        }
    };

    const handleEmployeeChange = (event) => {
        const selectedEmployeeId = event.target.value;
        setEmployeeId(selectedEmployeeId);
    };
    if (!(sessionStorage.getItem('AdName') == null)) {

        return (
            <>
                <AdmHeader />
                <Warn text={warnText} showWarn={showWarn} setShowWarn={setShowWarn} />
                <form className="batch-form">
                    <h2 className="batch-stop">受付の即時停止</h2>
                    <p className="notice">
                        この操作は日時の指定なしに、選択した従業員のすべての予約を一括で停止します。<br></br>
                        従業員を選択し、注意深く操作してください。
                    </p>
                    <div className="batchform-group">
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
                    <button type="button" onClick={stopAll} className="batchsubmit-button">予約を停止</button>
                </form>
            </>
        );
    } else {
        <div className="no-access">
            <h1>アクセス権限がありません</h1>
            <p>このページを表示するための権限がありません。管理者にお問い合わせください。</p>
            <a href="/" className="home-button">ホームページに戻る</a>
        </div>
    }
}

export default AdminStopAll;
