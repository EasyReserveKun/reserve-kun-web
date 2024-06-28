import React from 'react';
import './ContentItem.css';
import { Row, Col } from 'react-bootstrap';

const ContentItem = (props) => {
  return (
    <>
      <Row className="content-item">
        <Col md={2} className="empty-col"></Col> {/* 左の空白 */}
        <Col md={4} className="image-container">
          <img src={props.imgUrl} alt={props.name} className="img-fluid" />
        </Col>
        <Col md={6} className="text-container">
          <h2>{props.name}</h2>
          <p className="text">
            {props.text.split('\n').map((line, index) => (
              <React.Fragment key={index}>
                {line.trim()}
                <br />
              </React.Fragment>
            ))}
          </p>
        </Col>
      </Row>
    </>
  );
}

export default ContentItem;
