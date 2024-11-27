import React, { useState } from "react";
import LegendComponent from "./LegendComponent";
import DropdownFilterComponent from "./DropdownFilterComponent";
import './MapRightComponent.css';

const MapRightComponent = ({ setSelectedYear, mapColorObj }) => {
  return (
    <div className="map-right-container">
      {/* DropdownFilters Component */}
      <div className="dropdown-filter-wrapper">
        <DropdownFilterComponent setSelectedYear={setSelectedYear} />
      </div>
      {/* LegendComponent */}
      {mapColorObj && (
        <div className="legend-wrapper">
          <LegendComponent mapColorObj={mapColorObj} />
        </div>
      )}
    </div>
  );
};

export default MapRightComponent;
