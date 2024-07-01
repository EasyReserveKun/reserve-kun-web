import './Search.css';
import Modal from './Modal.js'
import React, { useState } from 'react';

function Search() {
const [show, setShow] = useState(false)
const [category, setCategory] = useState('')
const [date, setDate] = useState('')

  const handleDateChange = (event) => { setDate(event.target.value); };
  const handleCategoryChange = (event) => { setCategory(event.target.value); };
  const openModal = () => { 
    if( category != '' && date != '' ){
      setShow(true);
    }
  }

return (
    <div className="container custom-container">
      <div className="row">
        <div className="col-md-3">
          <input type="date" id="dateInput" className="form-control date-input" placeholder="日付を選択" value={date} onChange={handleDateChange}/>
        </div>
        <div className="col-md-6">
          <select id="categorySelect" className="form-control category-select" onChange={handleCategoryChange}>
          <option value=""></option>
          <option value="不動産">不動産</option>
          <option value="おうちの修繕">おうちの修繕</option>
          <option value="介護">介護</option>
          <option value="終活・相続">終活・相続</option>
          <option value="車・保健・金融">車・保健・金融</option>
        </select>
        </div>
        <div className="col-md-3">
          <button onClick={() => openModal()} className="btn btn-primary search-button">検索</button>
        </div>
      </div>
      <div>
        <Modal show={show} setShow={setShow} category={category} date={date}/>
      </div>
    </div>

  );
}
export default Search;
