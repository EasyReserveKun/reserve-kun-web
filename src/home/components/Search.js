// Import Modules
import React, { useState, useEffect } from 'react';
import { getApiUrl } from '../../GetApiUrl';

//Import StyleSheets
import './Search.css';
import Modal from './Modal.js'

//Import Component
import Warn from '../../common/Warn.js'

function Search() {
  const [show, setShow] = useState(false)
  const [reservedTimes, setReservedTimes] = useState('')
  const [category, setCategory] = useState("1")
  const [date, setDate] = useState(null)
  const [warnText, setWarnText] = useState("")
  const [showWarn, setShowWarn] = useState(false)

  //現在時刻を設定
  const nowDate = new Date();
  //最小日時を設定
  const minDate = new Date();
  minDate.setHours(minDate.getHours() + 1)
  //最大日時を設定
  const maxDate = new Date();
  maxDate.setMonth(maxDate.getMonth() + 2);
  maxDate.setHours(maxDate.getHours() + 1)

  useEffect(() => {
    const formattedMinDate = `${minDate.getFullYear()}-${(minDate.getMonth() + 1).toString().padStart(2, '0')}-${(minDate.getDate() + 1).toString().padStart(2, '0')}`;
    setDate(formattedMinDate);
  }, []);

  const handleDateChange = (event) => { setDate(event.target.value) };
  const handleCategoryChange = (event) => { setCategory(event.target.value); };
  const openModal = async () => {
    //入力した時間のバリデーション
    //TODO: 後で時間を調整する
    const inputDate = new Date(date);
    inputDate.setHours(nowDate.getHours());
    inputDate.setMinutes(nowDate.getMinutes());
    console.log("----------------------------------")
    console.log(minDate)
    console.log(inputDate)
    if (inputDate < minDate || inputDate > maxDate) {
      await setWarnText("予約は翌日以降かつ2か月以内のみ行えます");
      await setShowWarn(true);
      return null;
    }

    //本処理
    if (category !== '' && date !== '') {
      const requestData = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ date: date, eid: category })
      };

      try {
        const response = await fetch(getApiUrl() + "/reserve/available", requestData);
        const data = await response.text();
        setReservedTimes(data);
        setShow(true);
      } catch (error) {
        console.error('Fetch Error:', error);
        //TODO: エラー処理
      }
    } else {
      await setWarnText("予約は翌日以降かつ2か月以内のみ行えます");
      setShowWarn(true);
    }
  };

  if (sessionStorage.getItem('AccountName') !== null) {
    return (
      <div className='reservation'>
        <Warn text={warnText} showWarn={showWarn} setShowWarn={setShowWarn} />
        <div className="container custom-container">
          <h2>予約登録</h2>
          <div className="row">

            <div className="col-md-4">
              <input type="date" id="dateInput" className="form-control date-input" placeholder="日付を選択" value={date} onChange={handleDateChange} />
            </div>
            <div className="col-md-4">
              <select id="categorySelect" className="form-control category-select" onChange={handleCategoryChange} name="eid">
                <option value="1">不動産</option>
                <option value="2">おうちの修繕</option>
                <option value="3">介護</option>
                <option value="4">終活・相続</option>
                <option value="5">車・保健・金融</option>
              </select>
            </div>
            <div className="col-md-2">
              <button onClick={openModal} className="btn btn-primary search-button">検索</button>
            </div>
          </div>
          <div>
            <Modal show={show} setShow={setShow} setShowWarn={setShowWarn} setWarnText={setWarnText} category={category} date={date} reservedTimes={reservedTimes} />
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <>
        <br></br>
        <div className='yellow-tag'>
          <h4>※予約をするにはログインが必要です。</h4>
          ログインは<a href="/login">こちら</a>
        </div>
      </>


    );
  }
}
export default Search;
