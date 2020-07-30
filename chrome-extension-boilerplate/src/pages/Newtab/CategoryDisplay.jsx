import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { FaThumbtack } from 'react-icons/fa';
import { setToLocalStorage } from '../../utils/StorageUtils';
import 'bootstrap/dist/css/bootstrap.min.css';

// const fs = require("fs");
// const categoryData = {};

// fs.readFile("CategoryData.json", function (err, data) {
//     categoryData = JSON.parse(data);
// });

function determineCategoryUsingCrazyAI(url, title) {
  const categoryData = {
    Social: ['facebook', 'twitter', 'reddit', 'youtube'],

    Travel: ['kayak', 'expedia'],

    Studies: ['tutorial', 'library', 'pluralsight'],

    Work: ['azure', 'visualstudio'],
  };
  for (const category in categoryData) {
    console.log(category);
    var i = 0;
    for (i = 0; i < categoryData[category].length; i++) {
      // console.log(categoryDeterminer);
      if (url.toLowerCase().includes(categoryData[category][i])) {
        return category;
      }
    }
  }
  return 'Lol';
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

  function updatePins(elem, pin) {
    setPins([...pins, pin]);
    elem.style = 'color: yellow; pointer-events: none;';
    console.log('update pins' + pins);
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
      <div style={halfPane}>
        <h1>Work</h1>
        <table className="table table-dark">
          <thead>
            <tr>
              <th>Link</th>
            </tr>
          </thead>
          <tbody>
            {pins.map((pin) => {
              return (
                <tr key={pin.id}>
                  <td>{pin.title}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <div style={halfPane}>
        <h1>Personal</h1>
        <table className="table table-dark">
          <thead>
            <tr>
              <th>Link</th>
            </tr>
          </thead>
          <tbody>
            {pins.map((pin) => {
              return (
                <tr key={pin.id}>
                  <td>{pin.title}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <h1>History</h1>
      <table className="table table-sm table-dark">
        <thead>
          <tr></tr>
        </thead>
        <tbody>
          {historydata.map((urldata) => {
            return (
              <tr>
                <td>{urldata.title}</td>
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
