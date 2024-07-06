// Import Modules
import React from 'react';

// Import StyleSheets
import './ContentItem.css';

const ContentItem = ({data}) => {
  return (
    <div className='container'>
      <div className='row content-item'>
        <div className='col-md-5 img-content' >
          <a href={`/${data.id}`} className='link-style'>
            <img className='img-fluid' src={`${process.env.PUBLIC_URL}/image/${data.id}.png`} alt={data.name}></img>
            </a>
        </div>
        <div className='col-md-7 text-content'>
        <a href={`/${data.id}`} className='link-style'>
          <h5>{data.supervisor}<br></br>
            {data.name}
          </h5>
          <p>{data.text}</p>
          </a>
        </div>
      </div>
    </div>
  );
}

export default ContentItem;
