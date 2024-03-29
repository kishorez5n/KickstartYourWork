import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { FaThumbtack, FaWindowClose } from 'react-icons/fa';
import { setToLocalStorage } from '../../utils/StorageUtils';
import 'bootstrap/dist/css/bootstrap.min.css';

// const fs = require("fs");
// const categoryData = {};

// fs.readFile("CategoryData.json", function (err, data) {
//     categoryData = JSON.parse(data);
// });

const categories = ['Social', 'Studies', 'Work', 'Finance'];

const categoryData = {
  Social: ['facebook', 'twitter', 'reddit', 'youtube', 'gmail', 'inbox'],

  Travel: ['kayak', 'expedia'],

  Studies: [
    'tutorial',
    'library',
    'pluralsight',
    'mit',
    'medium.com',
    'technologyreview',
  ],

  Work: [
    'azure',
    'visualstudio',
    'github',
    'hack',
    'code',
    'algorithm',
    'repos',
    'bingatwork',
    'aria',
    'jarvis',
    'powerbi',
  ],

  Finance: [
    'bank',
    'stocks',
    'chase',
    'bofa',
    'robinhood',
    'loan',
    'mortagage',
  ],
};

function determineCategoryUsingCrazyAI(url, title) {
  for (const category in categoryData) {
    var i = 0;
    url = new URL(url);
    for (i = 0; i < categoryData[category].length; i++) {
      if (url.hostname.toLowerCase().includes(categoryData[category][i])) {
        return category;
      }
      if (url.href.toLowerCase().includes(categoryData[category][i])) {
        return category;
      }
      if (title.toLowerCase().includes(categoryData[category][i])) {
        return category;
      }
    }
  }
  return 'Unknown';
}

function CategoryDisplay({ historydata }) {
  const pinDataKey = 'pindata';
  const [pins, setPins] = useState([]);

  useEffect(() => {
    console.log('GET pins');
    chrome.storage.local.get(pinDataKey, (_getpins) => {
      console.log(_getpins[pinDataKey]);
      setPins(_getpins[pinDataKey]);
    });
  }, []);

  useEffect(() => {
    console.log('save pins' + pins);
    setToLocalStorage(pinDataKey, pins);
  }, [pins]);

  // add pin
  function updatePins(elem, pin) {
    var pincopy = [...pins];
    var idx = pincopy.findIndex((_pin) => _pin.url === pin.url);
    console.log('updatePins idx: ' + idx);
    if (idx === -1) {
      setPins([...pins, pin]);
      elem.style = 'color: yellow; pointer-events: none;';
      console.log('update pins' + pins);
    } else {
      console.log('update pin: Pin already exists' + pin);
    }
  }

  function removePin(pin) {
    var pincopy = [...pins];
    var index = pincopy.findIndex((elem) => elem.url === pin.url);
    console.log('removePin url: ' + pin.url);
    console.log('removePin idx: ' + index);
    if (index !== -1) {
      pincopy.splice(index, 1);
      setPins(pincopy);
    }
  }

  const cursorPointer = {
    cursor: 'pointer',
  };

  const halfPane = {
    width: '50%',
    float: 'left',
  };

  return (
    <>
      <div className="card-deck">
        {categories.map((category) => {
          return (
            <div className="card text-white bg-secondary mb-3">
              <div className="card-header bg-dark">{category}</div>
              <div className="card-body">
                <div className="list-group list-group-flush">
                  {pins.map((pin) => {
                    console.log(
                      'pin category:' + pin.category + ' category: ' + category
                    );
                    if (
                      determineCategoryUsingCrazyAI(pin.url, pin.title) ===
                      category
                    ) {
                      return (
                        <li className="list-group-item bg-secondary d-flex justify-content-between align-items-center">
                          <a
                            href={pin.url}
                            className="list-group-item-action text-white bg-secondary"
                          >
                            {pin.title}
                          </a>
                          <span
                            className="badge"
                            onClick={() => removePin(pin)}
                            style={cursorPointer}
                          >
                            {' '}
                            <FaWindowClose />{' '}
                          </span>
                        </li>
                      );
                    } else return <> </>;
                  })}
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <table className="table table-dark table-sm">
        <thead>
          <tr></tr>
        </thead>
        <tbody>
          {historydata.map((urldata) => {
            return (
              <tr key={urldata.url}>
                <td>
                  <a
                    href={urldata.url}
                    className="list-group-item-action text-white bg-dark"
                  >
                    {urldata.title}
                  </a>
                </td>
                <td>
                  {determineCategoryUsingCrazyAI(urldata.url, urldata.title)}
                </td>
                <td
                  onClick={(elem) => updatePins(elem.currentTarget, urldata)}
                  style={cursorPointer}
                >
                  {' '}
                  <FaThumbtack />{' '}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
}

CategoryDisplay.propTypes = {
  historydata: PropTypes.arrayOf(
    PropTypes.shape({
      url: PropTypes.string.isRequired,
      freq: PropTypes.number.isRequired,
    })
  ).isRequired,
};

CategoryDisplay.defaultProps = {
  historydata: [],
};

// CourseList.defaultProps =
export default CategoryDisplay;
