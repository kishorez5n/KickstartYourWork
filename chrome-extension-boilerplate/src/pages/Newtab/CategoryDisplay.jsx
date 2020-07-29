import React from 'react';
import PropTypes from 'prop-types';
import Table from 'react-bootstrap/Table';

function CategoryDisplay({ historydata }) {
    return (
        <Table striped bordered hover size="sm">
            <thead>
                <tr>
                    <th>URL</th>
                    <th>Frequency</th>
                    <th>Title</th>
                    <th>Category</th>
                </tr>
            </thead>
            <tbody>
                {historydata.map((urldata) => {
                    return (
                        <tr>
                            <td>{urldata.url}</td>
                            <td>{urldata.visitCount}</td>
                            <td>{urldata.title}</td>
                            <td>Random</td>
                        </tr>
                    );
                })}
            </tbody>
        </Table>
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
