// Import Modules
import React from 'react';
import { useNavigate } from 'react-router-dom';

//Import StyleSheets
import './Access.css';

//Import Component
import Header from './common/Header.js';
import Footer from './common/Footer.js';
import Toolbar from './common/Toolbar.js';

function Access() {
    const navigate = useNavigate();
    const returnReserve = () => {
        navigate('/');
        setTimeout(() => {
            window.scrollTo({
                top: 85,
                behavior: 'smooth',
            });
        });
    };

    //アクセスの表示
    return (
        <>
            <Header />
            <div className='homeLink'>
                <a href="/">ホーム&gt;</a>
                <a href="/access">アクセス</a>
            </div>
            <div className="address-container">
                <h3>交通アクセス</h3>
                <div className="address-info">
                    <p><strong>Aceスーパーマーケット東雲南店</strong></p>
                    <p>〒261-0023 千葉県千葉市美浜区中瀬１丁目６ エムベイポイント幕張ビル １Ｆ<br />
                        電話番号 03-1234-5678<br />
                        営業時間 9:00〜22:00<br /><br />
                        ※間違い電話が増えております。<br />
                        電話番号をよくお確かめのうえ、お間違えのないようにお願い申しあげます。
                    </p>
                </div>
                <div className="map-container">
                    <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d963.8490496485242!2d140.03970431324723!3d35.65264652257803!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6022818cad3b2b51%3A0x46cfe0bf92c231b9!2z44Ko44Og44O744OZ44Kk44Od44Kk44Oz44OI5bmV5by144OT44Or!5e0!3m2!1sja!2sjp!4v1720747835474!5m2!1sja!2sjp"
                        title="Google Maps"
                        width="100%"
                        height="450"
                        style={{ border: '0' }}
                        allowFullScreen=""
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                    ></iframe>
                    <table>
                        <thead>
                            <tr>
                                <th>最寄り駅</th>
                                <th>徒歩時間</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>JR京葉線 海浜幕張駅</td>
                                <td>徒歩5分</td>
                            </tr>
                            <tr>
                                <td>JR総武線 幕張駅</td>
                                <td>徒歩20分</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            <Footer />
            <Toolbar onClick={returnReserve} />
        </>
    );
}

export default Access;
