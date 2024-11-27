import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import {
  CRIMEDATA_END_POINT,
  GROUP_BY_YEAR,
  GROUP_BY_MOUNTH,
} from "../utils/APIConstants.js";
import TableComponent from "./TableComponent.jsx";
import './TableComponent.css';

Chart.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const searchByCommunityAPI = CRIMEDATA_END_POINT + GROUP_BY_YEAR;
const searchByCommunityAndYearAPI = CRIMEDATA_END_POINT + GROUP_BY_MOUNTH;

const BarChartComponent = ({ communityName, selectedYear, onYearClick, viewMode = 'chart' }) => {
  const [chartData, setChartData] = useState(null);
  const [xaxisText, setXaxisText] = useState("Year");

  useEffect(() => {
    let endpointAPI, chartLabel;
    if (communityName && selectedYear) {
      endpointAPI =
        searchByCommunityAndYearAPI +
        "?community=" +
        encodeURIComponent(communityName) +
        "&year=" +
        selectedYear;
      chartLabel = "Crime Count by Month";
      setXaxisText("Month");
    } else if (communityName) {
      endpointAPI =
        searchByCommunityAPI +
        "?community=" +
        encodeURIComponent(communityName);
      chartLabel = "Crime Count by Year";
      setXaxisText("Year");
    }

    fetch(endpointAPI)
      .then((response) => {
        if (!response.ok) {
          throw new Error(
            "Error while getting crimedata by endpoint api:" + endpointAPI
          );
        }
        return response.json();
      })
      .then((data) => {
        const ids = data.map((entry) => entry._id); //entry._id is Year: search by community, Month: search by commnity and year
        const counts = data.map((entry) => entry.totalCrimeCount);

        setChartData({
          labels: ids,
          datasets: [
            {
              label: chartLabel,
              data: counts,
              backgroundColor: "rgba(75, 192, 192, 0.6)",
              borderColor: "rgba(75, 192, 192, 1)",
              borderWidth: 1,
            },
          ],
          rawData: data, // Store raw data for table view
        });
      })
      .catch((error) => console.error("Error fetching bar chart data:", error));
  }, [communityName, selectedYear]);

  const handleBarClick = (event, chart) => {
    if (chart.length > 0) {
      const yearIndex = chart[0].index;
      const clickedYear = chartData.labels[yearIndex];
      onYearClick(clickedYear); // Notify the parent component
    }
  };

  return  chartData && (
    <div>

      {/* Conditionally render chart or table based on viewMode */}
      {viewMode === "chart" ? (
        <Bar
          data={chartData}
          options={{
            responsive: true,
            aspectRatio: 1.9,
            scales: {
              x: { title: { display: true, text: xaxisText } },
              y: {
                title: { display: true, text: "Crime Count" },
                beginAtZero: true,
              },
            },
            onClick: handleBarClick,
          }}
        />
      ) : viewMode === "table" ? (
        <div className="table-wrapper">
        <TableComponent data={chartData.rawData} xaxisText={xaxisText} />
        </div>
      ) : (
        <p>Loading data...</p>
      )}
    </div>
  );
};

export default BarChartComponent;
