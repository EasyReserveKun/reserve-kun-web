// LoadingSpinner.js
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './LoadingSpinner.css';

const LoadingSpinner = () => {
    return (
        <div className="loading-overlay">
            <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">読み込み中...</span>
            </div>
        </div>
    );
};

export default LoadingSpinner;
