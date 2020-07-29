import React from 'react';
import PropTypes from 'prop-types';
import Table from 'react-bootstrap/Table';
import 'bootstrap/dist/css/bootstrap.min.css';

function HistoryList(props) {
  return (
    <div style={{ maxWidth: "100%" }} >
      <Table striped bordered hover size="sm" variant="dark">
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
              </tr>
            );
          })}
        </tbody>
      </Table>
    </div>
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
