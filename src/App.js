// モジュールのインポート
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// スタイルシートのインポート
import './App.css';

// コンポーネントのインポート
import EmpLogin from "./EmpLogin";
import ReservationList from './ReservationList';
import AdmHeader from "./AdmHeader";
import AdminPage from "./AdminPage";
import Home from "./home/Home";
import Nf from "./nf/Nf";
import LoginForm from './login/LoginForm';
import SignUp from './signup/SignUp';
import LogoutSuccess from './logout/LogoutSuccess';
import SignUpSuccess from './signup/SignUpSuccess';
import Access from './Access';
import ReserveCheck from './ReserveCheck';
import Faq from './Faq';
import HanakoSato from './home/advisor/HanakoSato';
import TaroTanaka from './home/advisor/TaroTanaka';
import IchiroSuzuki from './home/advisor/IchiroSuzuki';
import MisakiTakahashi from './home/advisor/MisakiTakahashi';
import KentaNakamura from './home/advisor/KentaNakamura';

// ルート設定
const routes = [
  { path: "/", element: <Home /> },
  { path: "/login", element: <LoginForm /> },
  { path: "/signup", element: <SignUp /> },
  { path: "/signupsuccess", element: <SignUpSuccess /> },
  { path: "/logout", element: <LogoutSuccess /> },
  { path: "/Access", element: <Access /> },
  { path: "/ReserveCheck", element: <ReserveCheck /> },
  { path: "/faq", element: <Faq /> },
  { path: "/satohanako", element: <HanakoSato /> },
  { path: "/tanakataro", element: <TaroTanaka /> },
  { path: "/suzukiichiro", element: <IchiroSuzuki /> },
  { path: "/takahashimisaki", element: <MisakiTakahashi /> },
  { path: "/nakamurakenta", element: <KentaNakamura /> },
  { path: "*", element: <Nf /> },
  { path: "/empLogin", element: <EmpLogin /> },
  { path: "/AdminPage", element: <AdminPage /> },
  { path: "/AdmHeader", element: <AdmHeader /> },
  { path: "ReservationList", element: <ReservationList />}
];

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {routes.map(({ path, element }) => (
          <Route key={path} path={path} element={element} />
        ))}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
