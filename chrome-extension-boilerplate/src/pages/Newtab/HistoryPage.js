import React, { useState, useEffect } from 'react';
import HistoryList from './HistoryList';

function HistoryPage() {
  const [historydata, setUrls] = useState([]);

  let key = 'historydata';

  useEffect(() => {
    chrome.storage.local.get(key, (_historyUrls) => setUrls(_historyUrls[key]));
  }, [historydata]);

  return (
    <>
      <h2> History Links </h2>
      <HistoryList historydata={historydata} />
    </>
  );
}

export default HistoryPage;
