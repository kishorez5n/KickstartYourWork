import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Table from 'react-bootstrap/Table';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FaThumbtack } from 'react-icons/fa';

function HistoryList(props) {
  const [pins, setPins] = useState([]);

  /*
  useEffect(() => {
    //getCourses().then((_links) => setPins([_links[0], _links[1]]));
  }, []);
*/

  function updatePins(elem, pin) {
    setPins([...pins, pin]);
    elem.style = 'color: yellow; pointer-events: none;';
    // save
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
        <table className="table">
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
        <table className="table">
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
      <table striped bordered hover size="sm" variant="dark">
        <thead>
          <tr>
            <th class="col-sm-6">URL</th>
            <th class="col-sm-1">Frequency</th>
          </tr>
        </thead>
        <tbody>
          {props.historydata.map((urldata) => {
            return (
              <tr key={urldata.url}>
                <td>{urldata.url}</td>
                <td>{urldata.freq}</td>
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

HistoryList.propTypes = {
  historydata: PropTypes.arrayOf(
    PropTypes.shape({
      url: PropTypes.string.isRequired,
      freq: PropTypes.number.isRequired,
    })
  ).isRequired,
};

HistoryList.defaultProps = {
  historydata: [],
};

export default HistoryList;
