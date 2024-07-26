import React, { useState } from 'react';
import { getApiUrl } from '../GetApiUrl';
import Warn from '../common/Warn';
import './AdminStopAll.css';
import AdmHeader from '../common/AdminHeader';

function AdminOpenAll() {
    const [employeeId, setEmployeeId] = useState('');
    const [warnText, setWarnText] = useState('');
    const [showWarn, setShowWarn] = useState(false);

    const openAllReservations = async () => {
        const requestData = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ eid: employeeId })
        };

        try {
            const response = await fetch(getApiUrl() + "/employee/reactivate", requestData);
            const data = await response.text();

                setWarnText(data);
                setShowWarn(true);

        } catch (error) {
            console.error('Fetch Error:', error);
            setWarnText("予約停止の解除に失敗しました");
            setShowWarn(true);
        }
    };

    const handleEmployeeChange = (event) => {
        const selectedEmployeeId = event.target.value;
        setEmployeeId(selectedEmployeeId);
    };

    if (sessionStorage.getItem('AdName') !== null) {
        return (
            <>
                <AdmHeader />
                <div className='homeLink'>
                    <a href="/admin">ホーム&gt;</a>
                    <a href="/admin/openall">即時停止の解除</a>
                </div>
                <Warn text={warnText} showWarn={showWarn} setShowWarn={setShowWarn} />
                <div className="batch-form-container">
                    <form className="batch-form">
                        <h2 className="batch-open">全ての予約停止の解除</h2>
                        <p className="notice">
                            この操作は、選択した従業員のすべての予約停止を解除します。<br />
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
                                <option value="">従業員を選択してください。</option>
                                <option value="1">田中太郎</option>
                                <option value="2">佐藤花子</option>
                                <option value="3">鈴木一郎</option>
                                <option value="4">高橋美咲</option>
                                <option value="5">中村健太</option>
                            </select>
                        </div>
                        <button type="button" onClick={openAllReservations} className="batchopensubmit-button">
                            予約停止を解除<br />
                            <span className="buttonsmall-text">※即座に受付を開始します。</span>
                        </button>
                    </form>
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
}

export default AdminOpenAll;
