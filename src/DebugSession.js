function DebugSession(props) {
  function DebugLogin(){
    sessionStorage.setItem('AccountName','テスト太郎');
    sessionStorage.setItem('AccountMail','yota.s130319@icloud.com');
    window.alert("ログインしました：" + sessionStorage.getItem('AccountName'));
  }
  function DebugLogout(){
    sessionStorage.removeItem('AccountName');
    window.alert("ログアウトしました：" + sessionStorage.getItem('AccountName'));
  }

if(props.type === "Login"){
  return (
    <button onClick={DebugLogin}>デバッグログイン</button>
  );
} else if(props.type === "Logout"){
  return(
    <button onClick={DebugLogout}>デバッグログアウト</button>
  );
} else if(props.type === "Check"){
  return(
    <button onClick={() => window.alert(sessionStorage.getItem('AccountName'))}>チェック</button>
  );
} else {
  return(
    <p>デバッグボタン予定地</p>
  )
}
}
export default DebugSession;
  