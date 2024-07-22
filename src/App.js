// モジュールのインポート
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { CookiesProvider } from 'react-cookie';

// スタイルシートのインポート
import './App.css';

// コンポーネントのインポート
import Home from "./home/Home";
import LoginForm from './login/LoginForm';
import SignUp from './signup/SignUp';
import LogoutSuccess from './logout/LogoutSuccess';
import SignUpSuccess from './signup/SignUpSuccess';

import AdminHome from './adminhome/AdminHome';
import AdminStopAll from './adminstopall/AdminStopAll';
import AdminOpenAll from './adminstopall/AdminOpenAll';
import AdminLogin from "./adminlogin/AdminLogin";
import ReservationList from './adminlist/AdminList';
import AdminHeader from "./common/AdminHeader";
import AdminClose from "./adminclose/AdminClose";

import Nf from "./nf/Nf";


import Access from './Access';
import ReserveCheck from './ReserveCheck';
import ReactivationPage from './adminopen/AdminOpen';
import Faq from './Faq';
import HanakoSato from './home/advisor/HanakoSato';
import TaroTanaka from './home/advisor/TaroTanaka';
import IchiroSuzuki from './home/advisor/IchiroSuzuki';
import MisakiTakahashi from './home/advisor/MisakiTakahashi';
import KentaNakamura from './home/advisor/KentaNakamura';


function App() {
  return (
    <BrowserRouter>
      <CookiesProvider>
        <Routes>
          {/* 基本 */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/signupsuccess" element={<SignUpSuccess />} />
          <Route path="/logout" element={<LogoutSuccess />} />
          {/* ユーティリティ系 */}
          <Route path="/access" element={<Access />} />
          <Route path="/reservecheck" element={<ReserveCheck />} />
          <Route path="/faq" element={<Faq />} />
          {/* コンシェルジュ */}
          <Route path="/satohanako" element={<HanakoSato />} />
          <Route path="/tanakataro" element={<TaroTanaka />} />
          <Route path="/suzukiichiro" element={<IchiroSuzuki />} />
          <Route path="/takahashimisaki" element={<MisakiTakahashi />} />
          <Route path="/nakamurakenta" element={<KentaNakamura />} />
          {/* Admin系 */}
          <Route path="/adminlogin" element={<AdminLogin />} />
          <Route path="/admin" element={<AdminHome />} />
          <Route path="/admin/close" element={<AdminClose />} />
          <Route path="/admin/header" element={<AdminHeader />} />
          <Route path="/admin/closeall" element={<AdminStopAll />} />
          <Route path="/admin/openall" element={<AdminOpenAll />} />
          <Route path="/admin/open" element={<ReactivationPage />} />
          <Route path="/admin/list" element={<ReservationList />} />
          {/* NotFound */}
          <Route path="*" element={<Nf />} />
        </Routes>
      </CookiesProvider>
    </BrowserRouter>
  );
}

export default App;
