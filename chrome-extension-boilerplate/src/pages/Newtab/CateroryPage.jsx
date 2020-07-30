import React, { useState, useEffect } from 'react';
import CategoryDisplay from './CategoryDisplay';

function CategoryPage() {
  const [historydata, setHistoryData] = useState([]);

  let key = 'historydata';

  useEffect(() => {
    updateAllBrowserHistory();
  }, []);

  let updateAllBrowserHistory = function () {
    var microsecondsPerWeek = 1000 * 60 * 60 * 24;
    var timeLength = new Date().getTime() - microsecondsPerWeek;
    chrome.history.search(
      {
        text: '', // Return every history item....
        startTime: timeLength, // that was accessed less than one week ago.
      },
      function (historyItems) {
        historyItems = historyItems.sort((a, b) => {
          return b.visitCount - a.visitCount;
        });
        setHistoryData(historyItems.slice(0, 25));
        // for (var i = 0; i < 10; i++) {
        //     console.log(historyItems[i]);
        // }
      }
    );
  };

  return (
    <>
      <CategoryDisplay historydata={historydata} />
    </>
  );
}

export default CategoryPage;
