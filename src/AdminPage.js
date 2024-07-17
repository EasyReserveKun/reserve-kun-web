// Import Modules
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'
import { getApiUrl } from './GetApiUrl';


import './common/Form.css';

import Header from './common/Header.js';
import Footer from './common/Footer.js';

function AdminPage() {
    
    return (
        <>
            <Header />
            管理者用メニュー
            <Footer />
        </>
    );
};

export default AdminPage;