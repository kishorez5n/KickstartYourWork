import React from 'react';
import logo from '../../assets/img/logo.svg';
import './Newtab.css';
import './Newtab.scss';
import {
  getFromLocalStorage,
  getFromLocalStorageAsync,
} from '../../utils/StorageUtils';
// import Table from 'react-bootstrap/Table';
import HistoryPage from './HistoryPage';

const Newtab = () => {
  /*
  let historyData = [];
  historyData = getFromLocalStorageAsync('historydata');

  console.log('Storage get historyData: ' + historyData);
*/
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/pages/Newtab/Newtab.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <h6>The color of this paragraph is defined using SASS.</h6>
      </header>
      <HistoryPage />
    </div>
  );
};

export default Newtab;
