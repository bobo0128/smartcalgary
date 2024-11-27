import React from "react";
import "./LegendComponent.css";

const LegendComponent = ({ mapColorObj }) => {
  return (
    <div className="legend-container">
      {mapColorObj.map((item, index) => (
        <div className="legend-item" key={index}>
          <div
            className="legend-color"
            style={{ backgroundColor: item.color }}
          ></div>
          <span className="legend-label">
            {item.label}
          </span>
        </div>
      ))}
    </div>
  );
};

export default LegendComponent;
