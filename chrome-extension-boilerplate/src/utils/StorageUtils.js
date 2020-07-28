export function getFromLocalStorage(key) {
  chrome.storage.local.get([key], (items) => {
    return items[key];
  });
}

export function setToLocalStorage(key, value) {
  const keyValue = {};
  keyValue[key] = value;

  chrome.storage.local.set(keyValue);
}

export function setToLocalStorageK(key, value) {
  console.log('Storage: ' + key + ' v=' + value);
}
