export function getFromLocalStorage(key) {
  let res = null;

  chrome.storage.local.get(key, (items) => {
    res = items[key];
    console.log('Storage get1: ' + key + ' v=' + res);
  });

  console.log('Storage get: ' + key + ' v=' + res);
  return res;
}

export function setToLocalStorage(key, value) {
  const keyValue = {};
  keyValue[key] = value;

  chrome.storage.local.set(keyValue);
}

export function setToLocalStorageK(key, value) {
  console.log('Storage: ' + key + ' v=' + value);
}

export async function getFromLocalStorageAsync(key) {
  return new Promise((resolve, reject) => {
    chrome.storage.local.get(key, (items) => {
      console.log('Storage get async: ' + key + ' v=' + items[key]);
      resolve(items[key]);
    });
  });
}
