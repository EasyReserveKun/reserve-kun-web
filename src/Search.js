import './Search.css';
import Modal from './Modal.js'
import React, { useState, useEffect} from 'react';

function Search() {
  const [show, setShow] = useState(false)
  const [category, setCategory] = useState('')
  const [date, setDate] = useState('')
  const [tomorrow, setTomorrow] = useState('');
  const [maxDate, setMaxDate] = useState('');


  useEffect(() => {
    const today = new Date();
    const tomorrowDate = new Date(today);
    tomorrowDate.setDate(tomorrowDate.getDate() + 1);
    const tomorrowISO = tomorrowDate.toISOString().split('T')[0];
    setTomorrow(tomorrowISO); 
    
    const twoMonth = new Date(today.getFullYear(), today.getMonth() + 2, today.getDate());
    const maxDateISO = twoMonth.toISOString().split('T')[0];
    setMaxDate(maxDateISO);
  }, []);

  const handleDateChange = (event) => { setDate(event.target.value); };
  const handleCategoryChange = (event) => { setCategory(event.target.value); };
  const openModal = () => {
    if (category !== '' && date !== '') {
      setShow(true);
    }
  }

  if (sessionStorage.getItem('AccountName') !== null) {
    return (
      <div className='reservation'>
        <div className="container custom-container">
          <h2>予約登録</h2>
          <div className="row">
            <div className="col-md-4">
              <input type="date" id="dateInput" className="form-control date-input" placeholder="日付を選択" 
              value={date} onChange={handleDateChange} min={tomorrow} max={maxDate} />
            </div>
            <div className="col-md-4">
              <select id="categorySelect" className="form-control category-select" onChange={handleCategoryChange}>
                <option value=""></option>
                <option value="1">不動産</option>
                <option value="2">おうちの修繕</option>
                <option value="3">介護</option>
                <option value="4">終活・相続</option>
                <option value="5">車・保健・金融</option>
              </select>
            </div>
            <div className="col-md-2">
              <button onClick={() => openModal()} className="btn btn-primary search-button">検索</button>
            </div>
          </div>
          <div>
            <Modal show={show} setShow={setShow} category={category} date={date} />
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
