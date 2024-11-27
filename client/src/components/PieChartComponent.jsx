import React, { useEffect, useState } from "react";
import { Pie } from "react-chartjs-2";
import {
  Chart,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from "chart.js";
import {
  CRIMEDATA_END_POINT,
  GROUP_BY_CRIME_TYPE,
  GROUP_BY_CRIME_TYPE_YEARLY_DATA,
} from "../utils/APIConstants.js";
import TableComponent from "./TableComponent.jsx";
import "./TableComponent.css";

Chart.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

const groupByCrimeTypeAPI = CRIMEDATA_END_POINT + GROUP_BY_CRIME_TYPE;
const groupByCrimeTypeYearlyDataAPI =
  CRIMEDATA_END_POINT + GROUP_BY_CRIME_TYPE_YEARLY_DATA;

const PieChartComponent = ({ communityName, selectedYear, viewMode }) => {
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    let endpointAPI;
    if (communityName && selectedYear) {
      endpointAPI =
        groupByCrimeTypeYearlyDataAPI +
        "?community=" +
        encodeURIComponent(communityName) +
        "&year=" +
        selectedYear;
    } else if (communityName) {
      endpointAPI =
        groupByCrimeTypeAPI + "?community=" + encodeURIComponent(communityName);
    }
    fetch(endpointAPI)
      .then((response) => {
        if (!response.ok) {
          throw new Error(
            "Error while getting crimedata grouped by crime type "
          );
        }
        return response.json();
      })
      .then((data) => {
        const crimeTypes = data.map((entry) => entry._id);
        const counts = data.map((entry) => entry.totalCrimeCount);

        setChartData({
          labels: crimeTypes,
          datasets: [
            {
              label: "Crime Types",
              data: counts,
              backgroundColor: [
                "#FF6384",
                "#36A2EB",
                "#FFCE56",
                "#4BC0C0",
                "#9966FF",
                "#FF9F40",
                "#e6194b",
                "#3cb44b",
                "#ffe119",
                "#4363d8",
                "#f58231",
                "#911eb4",
                "#46f0f0",
                "#f032e6",
                "#bcf60c",
                "#fabebe",
                "#008080",
                "#e6beff",
                "#9a6324",
                "#fffac8",
                "#800000",
                "#aaffc3",
                "#808000",
                "#ffd8b1",
                "#000075",
                "#808080",
                "#ffffff",
                "#000000",
              ],
            },
          ],
          rawData: data,
        });
      })
      .catch((error) => console.error("Error fetching pie chart data:", error));
  }, [communityName, selectedYear]);

  return (
    chartData && (
      <div>
        {viewMode === "chart" ? (
          <div style={{ width: "90%", height: "80%", overflow: "hidden" }}>
            <Pie
              data={chartData}
              options={{
                responsive: true,
                aspectRatio: 1.7,
                // maintainAspectRatio: false,
                
                layout: {
                  padding: 0, // Optional, to remove any extra padding around the chart
                },
                plugins: {
                  legend: {
                    position: "right",
                  },
                },
              }}
            />
          </div>
        ) : viewMode === "table" ? (
          <div className="table-wrapper">
            <TableComponent data={chartData.rawData} xaxisText="Crime Type" />
          </div>
        ) : (
          <p>Loading data...</p>
        )}
      </div>
    )
  );
};

export default PieChartComponent;
