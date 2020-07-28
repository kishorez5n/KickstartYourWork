import React from 'react';
import PropTypes from 'prop-types';
import Table from 'react-bootstrap/Table';

function HistoryList(props) {
  return (
    <Table striped bordered hover variant="dark" size="sm">
      <thead>
        <tr>
          <th>URL</th>
          <th>Frequency</th>
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

// CourseList.defaultProps =
export default HistoryList;
