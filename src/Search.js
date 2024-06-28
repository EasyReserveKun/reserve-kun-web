import './Search.css';

function Search() {
  return (
    <div className="container custom-container">
      <div className="row">
        <div className="col-md-3">
          <input type="date" id="dateInput" className="form-control date-input" placeholder="日付を選択"/>
        </div>
        <div className="col-md-6">
          <select id="categorySelect" className="form-control category-select">
          <option value="不動産">不動産</option>
          <option value="おうちの修繕">おうちの修繕</option>
          <option value="介護">介護</option>
          <option value="終活・相続">終活・相続</option>
          <option value="車・保健・金融">車・保健・金融</option>
        </select>
        </div>
        <div className="col-md-3">
          <button onclick="redirectToSearchResult()" className="btn btn-primary search-button">検索</button>
        </div>
      </div>
    </div>
  );
}
export default Search;
