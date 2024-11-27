import React, {
  useState,
  forwardRef,
  useImperativeHandle,
  useEffect,
} from "react";
import BarChartComponent from "./BarChartComponent";
import PieChartComponent from "./PieChartComponent";
import "./Dashboard.css";

const Dashboard = forwardRef(({ communityName, showDashboard, dropDownSelectedYear }, ref) => {
  const [selectedYear, setSelectedYear] = useState(dropDownSelectedYear);
  const [viewMode, setViewMode] = useState("chart"); // State to control the view mode (chart or table)
  const [isInherited, setIsInherited] = useState(dropDownSelectedYear? true: false);

  const resetSeletecYear = () => {
    console.log("calling resetSelectYear...");
    setSelectedYear(null);
    setIsInherited(false);
  };

  const setSelectedYearByInheritedValue = (inheritedValue) => {
    setSelectedYear(inheritedValue);
    setIsInherited(true);
  };

  useImperativeHandle(ref, () => ({
    resetSeletecYear,
    setSelectedYearByInheritedValue,
  }));

  const handleYearClick = (year) => {
    setSelectedYear(year);
  };

  const handleBackClick = () => {
    setSelectedYear(null);
  };


  return (
    <>
      {showDashboard && (
        <div  className="section-container">
          <div>
            {communityName && (
              <h3>
                Community: {communityName}, Year:{" "}
                {selectedYear ? selectedYear : "2018 - Current"}
              </h3>
            )}
            <div style={{ marginBottom: "10px" }}>
              <button
                onClick={() => setViewMode("chart")}
                disabled={viewMode === "chart"}
              >
                View Chart
              </button>
              <button
                onClick={() => setViewMode("table")}
                disabled={viewMode === "table"}
              >
                View Table
              </button>
            </div>
          </div>
          <div id="detailsDiv">
            {!selectedYear ? (
              <>
                <div className="child-div">
                  <BarChartComponent
                    communityName={communityName}
                    onYearClick={handleYearClick}
                    viewMode={viewMode}
                  />
                </div>
                <div className="child-div">
                  <PieChartComponent
                    communityName={communityName}
                    viewMode={viewMode}
                  />
                </div>
              </>
            ) : (
              <>
                {!isInherited && (
                  <button
                    onClick={handleBackClick}
                    style={{ marginBottom: "10px" }}
                  >
                    ← Back
                  </button>
                )}

                <div className="child-div">
                  <BarChartComponent
                    communityName={communityName}
                    selectedYear={selectedYear}
                    onYearClick={() => {}}
                    viewMode={viewMode}
                  />
                </div>
                <div className="child-div">
                  <PieChartComponent
                    communityName={communityName}
                    selectedYear={selectedYear}
                    viewMode={viewMode}
                  />
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
});

export default Dashboard;
