import React from 'react';
import './ContentItem.css';

const ContentItem = (props) => {
  return (
    <div className='container'>
      <div className='row content-item'>
        <div className='col-md-5 img-content' >
          <a href={props.url} className='link-style'>
            <img className='img-fluid' src={props.imgUrl} alt={props.name}></img>
            </a>
        </div>
        <div className='col-md-7 text-content'>
        <a href={props.url} className='link-style'>
          <h5>{props.supervisor}<br></br>
            {props.name}
          </h5>
          <p>{props.text}</p>
          </a>
        </div>
      </div>
    </div>
  );
}

export default ContentItem;
