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
import CategoryPage from './CateroryPage';

const Newtab = () => {
  /*
  let historyData = [];
  historyData = getFromLocalStorageAsync('historydata');

  console.log('Storage get historyData: ' + historyData);
*/
  return (
    <div className="App">
      <CategoryPage />
    </div>
  );
};

export default Newtab;
