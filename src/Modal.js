import './Search.css';
import './Modal.css'
import './Timebutton'

function Search(props) {
  if (props.show){
  return (
    <>
    <div id="overlay">
      <div id="content">
        <h5>予約ウィンドウ</h5>
        <p>日付：{props.date}</p>
        <p>目的：{props.category}</p>
        <button className="green-button">10:00～</button>
        <button className="gray-button" disabled>11:00～</button>
        <button className="green-button">12:00～</button><br></br>
        <button className="green-button">13:00～</button>
        <button className="gray-button" disabled>14:00～</button>
        <button className="green-button">15:00～</button>
        <button className="green-button">16:00～</button>
        <button className="green-button">17:00～</button>
        <button className="gray-button" disabled>18:00～</button>
        <button className="green-button">19:00～</button>
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
