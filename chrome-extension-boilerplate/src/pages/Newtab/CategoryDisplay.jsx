import React from 'react';
import PropTypes from 'prop-types';
import Table from 'react-bootstrap/Table';

// const fs = require("fs");
// const categoryData = {};

// fs.readFile("CategoryData.json", function (err, data) {
//     categoryData = JSON.parse(data);
// });

function determineCategoryUsingCrazyAI(url, title) {
    const categoryData = {
        "Social": [
            "facebook",
            "twitter",
            "reddit",
            "youtube"
        ],

        "Travel": [
            "kayak",
            "expedia"
        ],

        "Studies": [
            "tutorial",
            "library",
            "pluralsight"
        ],

        "Work": [
            "azure",
            "visualstudio"
        ]
    }
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
    return "Lol";
}

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
                            <td>{determineCategoryUsingCrazyAI(urldata.url, urldata.title)}</td>
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
