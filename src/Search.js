import './Search.css';
import Modal from './Modal.js'
import RedirectData from './RedirectData.js'
import React, { useState } from 'react';

function Search() {
  const [show, setShow] = useState(false)
  const [category, setCategory] = useState('')
  const [date, setDate] = useState('')
  const [reservedTimes, setReservedTimes] = useState('')

  const handleDateChange = (event) => { setDate(event.target.value); };
  const handleCategoryChange = (event) => { setCategory(event.target.value); };
  const openModal = async () => {
    if (category !== '' && date !== '') {
      const requestData = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify( { date: date, eid: category } )
      }
      const responce = await fetch("http://localhost:8080/b",requestData)
      const data = await responce.text();
      await setReservedTimes(data);
      setShow(true);
    }
  }

  // if (sessionStorage.getItem('AccountName') !== null) {
    return (
      <div className='reservation'>
        <div className="container custom-container">
            <h2>予約登録</h2>
            <div className="row">
            
              <div className="col-md-4">
                <input type="date" id="dateInput" className="form-control date-input" placeholder="日付を選択" value={date} onChange={handleDateChange} name="date"/>
              </div>
              <div className="col-md-4">
                <select id="categorySelect" className="form-control category-select" onChange={handleCategoryChange}  name="eid">
                  <option value=""></option>
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
              <Modal show={show} setShow={setShow} category={category} date={date} reservedTimes={reservedTimes}/>
            </div>
            <RedirectData />
            
            
        </div>
      </div>
      
    );
  // } else {
  //   return (
  //     <>
  //       <br></br>
  //       <div className='yellow-tag'>
  //         <h4>※予約をするにはログインが必要です。</h4>
  //         ログインは<a href="/login">こちら</a>
  //       </div>
  //     </>


  //   );
  // }
}
export default Search;
