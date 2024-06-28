import './Search.css';
import './Modal.css'

function Search(props) {
  if (props.show){
  return (
    <>
    <div id="overlay">
      <div id="content">
        <p>予約ウィンドウ</p>
        <p>{props.employee}さんを予約します</p>
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
