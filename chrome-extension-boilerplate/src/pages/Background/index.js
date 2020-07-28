import {
  setToLocalStorage,
  setToLocalStorageK,
} from '../../utils/StorageUtils';

var contextMenuItem = {
  id: 'saveMecontextMenuId',
  title: 'save me',
  contexts: ['selection', 'image', 'all'],
};

var myUserId = '12345';

chrome.contextMenus.create(contextMenuItem);

chrome.contextMenus.onClicked.addListener(function (clickdata) {
  if (clickdata.menuItemId === 'saveMecontextMenuId') {
    saveData(clickdata);
  }
});

function saveData(clickdata) {
  var postData = {
    pageUrl: clickdata.pageUrl,
    userId: myUserId,
    selectedData: {
      selectedText: clickdata.selectionText,
      selectedMediaUrl: clickdata.srcUrl,
      selectedMediaType: clickdata.mediaType,
    },
  };
}

console.log('This is the background page.');

var numRequestsOutstanding = 0;
var microsecondsPerWeek = 1000 * 60 * 60 * 24; // * 7;
var timeLength = new Date().getTime() - microsecondsPerWeek;

chrome.history.search(
  {
    text: '', // Return every history item....
    startTime: timeLength, // that was accessed less than one week ago.
  },
  function (historyItems) {
    for (var i = 0; i < historyItems.length; ++i) {
      var url = historyItems[i].url;
      var processVisitsWithUrl = function (url) {
        return function (visitItems) {
          processVisits(url, visitItems);
        };
      };
      chrome.history.getVisits({ url: url }, processVisitsWithUrl(url));
      numRequestsOutstanding++;
    }
    if (!numRequestsOutstanding) {
      onAllVisitsProcessed();
    }
  }
);

var urlToCount = {};

function processVisits(url, visitItems) {
  for (var i = 0, ie = visitItems.length; i < ie; ++i) {
    // Ignore items unless the user typed the URL.
    /*
    if (visitItems[i].transition !== 'typed') {
      continue;
    }
    */
    if (!urlToCount[url]) {
      urlToCount[url] = 0;
    }
    urlToCount[url]++;
  }

  if (!--numRequestsOutstanding) {
    onAllVisitsProcessed();
  }
}
// This function is called when we have the final list of URls to display.
var onAllVisitsProcessed = function () {
  let urlArray = [];
  let urlData = [];

  for (var url in urlToCount) {
    urlArray.push(url);
    urlData.push({ url: url, freq: urlToCount[url] });
  }

  urlArray.sort(function (a, b) {
    return urlToCount[b] - urlToCount[a];
  });

  for (var urlk in urlArray) {
    // console.log('Counter: url=' + urlArray[urlk] + 'count=' + urlToCount[urlk]);
  }

  console.log('urlData: ' + urlData);

  setToLocalStorageK('historydata', urlToCount);
  setToLocalStorage('historydata', urlData);
  // buildPopupDom(divName, urlArray.slice(0, 10));
};

console.log('Put the background scripts here.');
