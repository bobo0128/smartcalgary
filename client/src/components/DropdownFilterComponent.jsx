import React, { useState, useEffect } from "react";

const DropdownFilterComponent = ({ setSelectedYear }) => {

  const [selectedYearOption, setSelectedYearOption] = useState('All');

   const years = Array.from(
    { length: new Date().getFullYear() - 2018 + 1 },
    (_, i) => 2018 + i
  );


  const handleYearSelect = (event) => {
    const selectedValue = event.target.value;
    setSelectedYear(selectedValue);
    setSelectedYearOption(selectedValue);
    // handleYearChange(selectedValue);
  };

  return (
    <div className="dropdown-filter-container">
      {/* Year Dropdown */}
      <div className="filter-group">
        <label className="filter-label">
          <strong>Filter by Year : </strong>
        </label>
        <select
          value={selectedYearOption}
          onChange={handleYearSelect}
          className="year-select"
        >
          <option value="">All</option>
          {years.map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default DropdownFilterComponent;
