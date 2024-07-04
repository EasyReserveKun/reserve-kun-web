import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

function RedirectedData() {
  const location = useLocation();

  useEffect(() => {
    // URLSearchParamsオブジェクトを使ってクエリパラメータを取得する
    const params = new URLSearchParams(location.search);
    // "list"という名前のクエリパラメータの値を取得し、カンマ区切りの文字列を配列に変換する
    const listValues = params.getAll('list');

    console.log('List values:', listValues);

    // ここで必要な処理を行う（例：リストをstateにセットする、表示するなど）

  }, [location]);

  return (
    <div>
      <h1>Redirected Page</h1>
      {/* 表示するコンポーネントを記述 */}
    </div>
  );
}

export default RedirectedData;
