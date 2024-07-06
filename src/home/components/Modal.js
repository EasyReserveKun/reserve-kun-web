// Import Modules
import React, { useState } from 'react';

// Import StyleSheets
import './Search.css';
import './Modal.css'
import '../../common/Timebutton'


function Search(props) {

  const [time, setTime] = useState("");
  const reservedTimes = props.reservedTimes;

  const onTimeDecide = (event) => {
    setTime(event.target.value);
    console.log(time);
  }

  const isTimeEmpty = time.trim()

  const renderTimeButtons = () => {
    const buttons = [];

    for (let hour = 10; hour <= 19; hour++) {
      const time = hour + ':00';
      const isReserved = reservedTimes.includes(time);

      const buttonClass = isReserved ? 'gray-button' : 'green-button';

      buttons.push(
        <div key={hour} className="col-lg-2 col-md-3 col-4">
          <button
            type="button"
            onClick={onTimeDecide}
            className={buttonClass}
            value={time}
            disabled={isReserved}
          >
            {time}～
          </button>
        </div>
      );
    }
    return buttons;
  }


  if (props.show) {
    return (
      <div id="overlay">
        <div id="content">
          <form className='form-container' method='POST' action="http://localhost:8080/reserve/insert">
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
                <input type="email" name="cid" value={sessionStorage.getItem('AccountMail')} required readOnly /><br></br>
              </div>
            </div>
            <div className='row'>
              <div className='col-2 modal-label'>
                <label>時間帯</label>
              </div>
              <div className='col-8  modal-input'>
                <input type="text" name="time" value={time} id="timezone" placeholder='ボタンで時間を指定してください' readOnly></input><br></br>
              </div>
            </div>
            <div className="row gx-2">
              {renderTimeButtons()}
            </div>
            <div className='row'>
              <div className='col-2 modal-label'>
                <label htmlFor="etc">備考</label><br></br>
              </div>
              <div className='col-8  modal-input'>
                <input type="text" name="etc" id="etc"></input>
              </div>
            </div>
            <button type="submit" className='btn btn-primary' disabled={!isTimeEmpty}>予約する</button>
          </form>
        </div>
      </div>
    );
  } else {
    return null;
  }
}
export default Search;
