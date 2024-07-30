import React, { useState, useEffect } from 'react';
import { useCookies } from 'react-cookie';
import { getApiUrl } from '../GetApiUrl';
import Warn from '../common/Warn';
import './AdminOpenAll.css';
import AdmHeader from '../common/AdminHeader';

function AdminOpenAll() {
    const [employees, setEmployees] = useState([]);
    const [warnText, setWarnText] = useState('');
    const [showWarn, setShowWarn] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [cookie] = useCookies();

    const flagCheck = async () => {
        const requestData = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({})
        };

        try {
            setIsLoading(true);
            const response = await fetch(getApiUrl() + "/employee/flagCheck", requestData);
            const data = await response.json(); // JSONとしてレスポンスを解析

            console.log(data);
            // データを従業員リストとして処理
            const updatedEmployees = [
                { id: '1', name: '田中太郎', isActive: data[0] === '1' },
                { id: '2', name: '佐藤花子', isActive: data[1] === '1' },
                { id: '3', name: '鈴木一郎', isActive: data[2] === '1' },
                { id: '4', name: '高橋美咲', isActive: data[3] === '1' },
                { id: '5', name: '中村健太', isActive: data[4] === '1' },
            ];

            setEmployees(updatedEmployees);
        } catch (error) {
            console.error('Fetch Error:', error);
        } finally {
            setIsLoading(false); // ローディングが終わったらステートを更新
        }
    };

    useEffect(() => {
        flagCheck();
    }, []);

    const openReservation = async (employeeId) => {
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
            // 解除後にデータをリフレッシュ
            await flagCheck();
        } catch (error) {
            console.error('Fetch Error:', error);
            setWarnText("予約停止の解除に失敗しました");
            setShowWarn(true);
        }
    };

    if (cookie.admin != null) {
        return (
            <>
                <AdmHeader />
                <div className='homeLink'>
                    <a href="/admin">ホーム&gt;</a>
                    <a href="/admin/openall">即時停止の解除</a>
                </div>
                <Warn text={warnText} showWarn={showWarn} setShowWarn={setShowWarn} />
                <div className="batch-form-container">
                    <h2 className="batch-open">全ての予約停止の解除</h2>
                    <p className="notice">
                        この操作は、選択した従業員のすべての予約停止を解除します。<br />
                        従業員を選択し、注意深く操作してください。
                    </p>
                    {isLoading ? (
                        <p>Loading...</p> // ローディング中はスピナーを表示
                    ) : (
                        <table className="employee-table">
                            <thead>
                                <tr>
                                    <th>従業員名</th>
                                    <th>受付開始</th>
                                </tr>
                            </thead>
                            <tbody>
                                {employees.map((employee) => (
                                    <tr key={employee.id}>
                                        <td>{employee.name}</td>
                                        <td>
                                            <button 
                                                type="button" 
                                                onClick={() => openReservation(employee.id)}
                                                className={`release-button ${employee.isActive ? 'disabled' : ''}`}
                                                disabled={employee.isActive} // 解除済みの場合に無効化
                                            >
                                                受付開始
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
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
}

export default AdminOpenAll;
