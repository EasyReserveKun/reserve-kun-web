import React from 'react';
import './ContentItem.css';

const ContentItem = (props) => {
  return (
    <div className='container'>
      <div className='row content-item'>
        <div className='col-md-5 img-content'>
          <img className='img-fluid' src={props.imgUrl} alt={props.name}></img>
        </div>
        <div className='col-md-7 text-content'>
          <h5>{props.supervisor}<br></br>
          {props.name}
          </h5>
          <p>{props.text}</p>
        </div>
      </div>
    </div>
  );
}

export default ContentItem;
