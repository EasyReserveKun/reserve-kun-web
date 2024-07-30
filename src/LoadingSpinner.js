// Import Modules
import React from 'react';

//Import StyleSheets
import './LoadingSpinner.css';

const LoadingSpinner = () => {
    return (
        <div className="loading-overlay">
            <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden"></span>
            </div>
        </div>
    );
};

export default LoadingSpinner;
