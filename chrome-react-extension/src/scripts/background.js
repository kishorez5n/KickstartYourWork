var contextMenuItem = {
  id: "saveMecontextMenuId",
  title: "save me",
  contexts: ["selection", "image", "all"],
};

var myUserId = "12345";

chrome.contextMenus.create(contextMenuItem);

chrome.contextMenus.onClicked.addListener(function (clickdata) {
  if (clickdata.menuItemId == "saveMecontextMenuId") {
    var selUrl = clickdata.pageUrl;
    var selText = clickdata.selectionText;

    var selImg = clickdata.srcUrl;
    var medType = clickdata.mediaType;

    saveData(clickdata);
  }
});

function saveData(clickdata) {
  var pageUrl = clickdata.pageUrl;
  var selText = clickdata.selectionText;

  var selImg = clickdata.srcUrl;
  var medType = clickdata.mediaType;

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
