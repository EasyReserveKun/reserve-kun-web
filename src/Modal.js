import './Search.css';
import './Modal.css'
import './Timebutton'
import { useState } from 'react';

function Search(props) {

  const [time, setTime] = useState("");

  const onTimeDecide = (event) => {
    setTime(event.target.value);
  }
  if (props.show){
  return (
    <>
    <div id="overlay">
      <div id="content">
        <form className='form-container' method='POST' action='http://localhost:8080/reserve'>
          <h5>予約ウィンドウ</h5>
          <label>日付：</label><br></br>
          <input type="text" name="date" value={props.date}/> <br></br>
          <label></label>目的：<br></br>
          <input type="text" name="category" value={props.category}/> <br></br>
          メールアドレス：
          <input type="email" name="cid" required /><br></br>
          時間帯：
          <input type="number" name="time" value={time} placeholder='ボタンで時間を指定してください' required></input><br></br>
          <div className="row">
            <div class="col-xl-1 col-lg-2 col-md-3 col-4">
              <button type="button" onClick={onTimeDecide} className="green-button" value="10">10:00～</button>
            </div>
            <div class="col-xl-1 col-lg-2 col-md-3 col-4">
              <button type="button" onClick={onTimeDecide} className="gray-button"  value="11" disabled>11:00～</button>
            </div>
            <div class="col-xl-1 col-lg-2 col-md-3 col-4">
              <button type="button" onClick={onTimeDecide} className="green-button" value="12">12:00～</button>
            </div>
            <div class="col-xl-1 col-lg-2 col-md-3 col-4">
            <button type="button" onClick={onTimeDecide} className="green-button" value="13"> 13:00～</button>
            </div>
            <div class="col-xl-1 col-lg-2 col-md-3 col-4">
            <button type="button" onClick={onTimeDecide} className="gray-button" value="14" disabled>14:00～</button><br></br>
            </div>
            <div class="col-xl-1 col-lg-2 col-md-3 col-4">
            <button type="button" onClick={onTimeDecide} className="green-button" value="15">15:00～</button>
            </div>
            <div class="col-xl-1 col-lg-2 col-md-3 col-4">
            <button type="button" onClick={onTimeDecide} className="green-button" value="16">16:00～</button>
            </div>
            <div class="col-xl-1 col-lg-2 col-md-3 col-4">
            <button type="button" onClick={onTimeDecide} className="green-button" value="17">17:00～</button>
            </div>
            <div class="col-xl-1 col-lg-2 col-md-3 col-4">
            <button type="button" onClick={onTimeDecide} className="gray-button" value="18" disabled>18:00～</button>
            </div>
            <div class="col-xl-1 col-lg-2 col-md-3 col-4">
              <button type="button" onClick={onTimeDecide} className="green-button" value="19">19:00～</button><br></br>
            </div>
          </div>
          <label for="etc">備考</label><br></br>
          <input type="text" name="etc" id="etc"></input>
          <button type="submit" className='btn btn-primary'>予約する</button>
        </form>
        <p><button onClick={() => props.setShow(false)}>close</button></p>
      </div>
    </div>
    </>
  );
  } else{
    return null;
  }
}
export default Search;
