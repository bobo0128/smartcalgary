import React, {useState} from "react";
import './TableComponent.css';
import '../App.css';

const TableComponent = ({ data, xaxisText }) => {
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });
  const [sortedData, setSortedData] = useState(data);

  const sortData = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });

    const sorted = [...data].sort((a, b) => {
      if (a[key] < b[key]) {
        return direction === "asc" ? -1 : 1;
      }
      if (a[key] > b[key]) {
        return direction === "asc" ? 1 : -1;
      }
      return 0;
    });
    setSortedData(sorted);
  };

  const getArrowIcon = (key) => {
    if (sortConfig.key === key) {
      return sortConfig.direction === "asc" ? "▲" : "▼";
    }
    return "↕"; // Neutral arrow
  };




  return (
    <div className="table-container">
    <table className="styled-table">
      <thead className="universal-color">
        <tr>
          <th onClick={ ()=> sortData("_id") }>{xaxisText} {getArrowIcon("_id")}</th>
          <th onClick={ ()=> sortData("totalCrimeCount")}>Crime Count {getArrowIcon("totalCrimeCount")}</th>
        </tr>
      </thead>
      <tbody>
        {sortedData.map((entry) => (
          <tr key={entry._id}>
            <td>{entry._id}</td>
            <td>{entry.totalCrimeCount}</td>
          </tr>
        ))}
      </tbody>
    </table>
    </div>
  );
};

export default TableComponent;
