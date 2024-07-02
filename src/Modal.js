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
              <h5>予約内容</h5>
              <button className="bi bi-x-circle text-right" onClick={() => props.setShow(false)}></button>
            </div>
            <label>日付：</label><br></br>
            <input type="text" name="date" value={props.date} readOnly /> <br></br>


            <label></label>目的：<br></br>
            <select value={props.category} name="eid" id="categorySelect" className="form-control" readOnly>
              <option value="0"></option>
              <option value="1">不動産</option>
              <option value="2">おうちの修繕</option>
              <option value="3">介護</option>
              <option value="4">終活・相続</option>
              <option value="5">車・保健・金融</option>
            </select>
            メールアドレス：
            <input type="email" name="cid" required /><br></br>
            時間帯：
            <input type="number" name="time" value={time} id="timezone" placeholder='ボタンで時間を指定してください' readOnly></input><br></br>
            <div className="row">
              <div className="col-xl-1 col-lg-2 col-md-3 col-4">
                <button type="button" onClick={onTimeDecide} className="green-button" value="10">10:00～</button>
              </div>
              <div className="col-xl-1 col-lg-2 col-md-3 col-4">
                <button type="button" onClick={onTimeDecide} className="gray-button" value="11" disabled>11:00～</button>
              </div>
              <div className="col-xl-1 col-lg-2 col-md-3 col-4">
                <button type="button" onClick={onTimeDecide} className="green-button" value="12">12:00～</button>
              </div>
              <div className="col-xl-1 col-lg-2 col-md-3 col-4">
                <button type="button" onClick={onTimeDecide} className="green-button" value="13"> 13:00～</button>
              </div>
              <div className="col-xl-1 col-lg-2 col-md-3 col-4">
                <button type="button" onClick={onTimeDecide} className="gray-button" value="14" disabled>14:00～</button><br></br>
              </div>
              <div className="col-xl-1 col-lg-2 col-md-3 col-4">
                <button type="button" onClick={onTimeDecide} className="green-button" value="15">15:00～</button>
              </div>
              <div className="col-xl-1 col-lg-2 col-md-3 col-4">
                <button type="button" onClick={onTimeDecide} className="green-button" value="16">16:00～</button>
              </div>
              <div className="col-xl-1 col-lg-2 col-md-3 col-4">
                <button type="button" onClick={onTimeDecide} className="green-button" value="17">17:00～</button>
              </div>
              <div className="col-xl-1 col-lg-2 col-md-3 col-4">
                <button type="button" onClick={onTimeDecide} className="gray-button" value="18" disabled>18:00～</button>
              </div>
              <div className="col-xl-1 col-lg-2 col-md-3 col-4">
                <button type="button" onClick={onTimeDecide} className="green-button" value="19">19:00～</button><br></br>
              </div>
            </div>
            <label htmlFor="etc">備考</label><br></br>
            <input type="text" name="etc" id="etc"></input>
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
