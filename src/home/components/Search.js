// Import Modules
import React, { useState, useEffect } from 'react';
import { useCookies } from 'react-cookie'
import { getApiUrl } from '../../GetApiUrl';

//Import StyleSheets
import './Search.css';

//Import Component
import Modal from './Modal.js'
import Warn from '../../common/Warn.js'
import LoadingSpinner from '../../LoadingSpinner';

function Search() {
  const [show, setShow] = useState(false)
  const [reservedTimes, setReservedTimes] = useState('')
  const [category, setCategory] = useState("1")
  const [date, setDate] = useState(null)
  const [warnText, setWarnText] = useState("")
  const [showWarn, setShowWarn] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [cookie, ,] = useCookies()

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
    setDate(formattedMinDate); // eslint-disable-next-line
  }, []);

  const handleDateChange = (event) => { setDate(event.target.value) };
  const handleCategoryChange = (event) => { setCategory(event.target.value); };
  const openModal = async () => {

    const inputDate = new Date(date);
    inputDate.setHours(nowDate.getHours());
    inputDate.setMinutes(nowDate.getMinutes());
    if (inputDate < minDate || inputDate > maxDate) {
      await setWarnText("予約は翌日以降かつ2か月以内のみ行えます");
      await setShowWarn(true);
      return null;
    }

    //予約受付状況の検索
    if (category !== '' && date !== '') {
      const requestData = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ eid: category })
      };

      try {
        const response = await fetch(getApiUrl() + "/reserve/available/flag", requestData);
        const data = await response.text();
        if (data === "現在は予約を受け付けておりません") {
          await setWarnText(data);
          await setShowWarn(true);
          return null;
        }
      } catch (error) {
        console.error('Fetch Error:', error);
      }
    } else {
      await setWarnText("予約は翌日以降かつ2か月以内のみ行えます");
      setShowWarn(true);
    }

    //予約検索の処理
    if (category !== '' && date !== '') {
      setIsLoading(true);
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
        setIsLoading(false);
        setShow(true);
      } catch (error) {
        console.error('Fetch Error:', error);
      }
    } else {
      await setWarnText("予約は翌日以降かつ2か月以内のみ行えます");
      setIsLoading(false);
      setShowWarn(true);
    }
  };

  if (cookie.token) {
    //ログイン中の画面
    return (
      <>
        {isLoading && <LoadingSpinner />}
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
      </>
    );
  } else {
    //未ログイン時の画面
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
