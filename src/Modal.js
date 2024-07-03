import './Search.css';
import './Modal.css'
import './Timebutton'
import React, { useState } from 'react';

function Search(props) {

  const [time, setTime] = useState("");

  const onTimeDecide = (event) => {
    setTime(event.target.value);
  }

  if (props.show) {
    return (
      <div id="overlay">
        <div id="content">
          <form className='form-container' method='POST' action='http://localhost:8080/reserve'>
            <div className='row'>
              <div className='col text-right'>
                <button className="bi bi-x-circle" onClick={() => props.setShow(false)}></button>
              </div>
            </div>

            <div className='row'>
              <h5>予約内容</h5>
            </div>

            <div className='row'>
              <div className='col-2 modal-label'>
                <label>日付</label>
              </div>
              <div className='col-8  modal-input'>
                <input type="text" name="date" value={props.date} readOnly /> <br></br>
              </div>
            </div>

            <div className='row'>
              <div className='col-2 modal-label'>
                <label>目的</label>
              </div>
              <div className='col-8  modal-input'>
                <select value={props.category} name="eid" className="form-control" readOnly>
                  <option value="0"></option>
                  <option value="1">不動産</option>
                  <option value="2">おうちの修繕</option>
                  <option value="3">介護</option>
                  <option value="4">終活・相続</option>
                  <option value="5">車・保健・金融</option>
                </select>
              </div>
            </div>
            <div className='row'>
              <div className='col-2 modal-label'>
                <label>Eメール</label>
              </div>
              <div className='col-8  modal-input'>
                <input type="email" name="cid" required /><br></br>
              </div>
            </div>
            <div className='row'>
              <div className='col-2 modal-label'>
                <label>時間帯</label>
              </div>
              <div className='col-8  modal-input'>
                <input type="number" name="time" value={time} id="timezone" placeholder='ボタンで時間を指定してください' readOnly></input><br></br>
              </div>
            </div>
            <div className="row gx-2">
              <div className="col-lg-2 col-md-3 col-4">
                <button type="button" onClick={onTimeDecide} className="green-button" value="10">10:00～</button>
              </div>
              <div className="col-lg-2 col-md-3 col-4">
                <button type="button" onClick={onTimeDecide} className="gray-button" value="11" disabled>11:00～</button>
              </div>
              <div className="col-lg-2 col-md-3 col-4">
                <button type="button" onClick={onTimeDecide} className="green-button" value="12">12:00～</button>
              </div>
              <div className="col-lg-2 col-md-3 col-4">
                <button type="button" onClick={onTimeDecide} className="green-button" value="13"> 13:00～</button>
              </div>
              <div className="col-lg-2 col-md-3 col-4">
                <button type="button" onClick={onTimeDecide} className="gray-button" value="14" disabled>14:00～</button><br></br>
              </div>
              <div className="col-lg-2 col-md-3 col-4">
                <button type="button" onClick={onTimeDecide} className="green-button" value="15">15:00～</button>
              </div>
              <div className="col-lg-2 col-md-3 col-4">
                <button type="button" onClick={onTimeDecide} className="green-button" value="16">16:00～</button>
              </div>
              <div className="col-lg-2 col-md-3 col-4">
                <button type="button" onClick={onTimeDecide} className="green-button" value="17">17:00～</button>
              </div>
              <div className="col-lg-2 col-md-3 col-4">
                <button type="button" onClick={onTimeDecide} className="gray-button" value="18" disabled>18:00～</button>
              </div>
              <div className="col-lg-2 col-md-3 col-4">
                <button type="button" onClick={onTimeDecide} className="green-button" value="19">19:00～</button><br></br>
              </div>
            </div>
            <div className='row'>
              <div className='col-2 modal-label'>
                <label htmlFor="etc">備考</label><br></br>
              </div>
              <div className='col-8  modal-input'>
                <input type="text" name="etc" id="etc"></input>
              </div>
            </div>
            <button type="submit" className='btn btn-primary'>予約する</button>
          </form>
        </div>
      </div>
    );
  } else {
    return null;
  }
}
export default Search;
