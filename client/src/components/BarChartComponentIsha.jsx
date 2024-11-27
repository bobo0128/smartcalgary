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


Chart.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const BarChartComponent = ({ communityName, onYearClick }) => {
  const [chartData, setChartData] = useState(null);
  const [viewMode, setViewMode] = useState("chart"); // State to control the view mode (chart or table)
  const [selectedYear, setSelectedYear] = useState(null); // State for the selected year
  const [monthlyData, setMonthlyData] = useState(null); // State for monthly data based on selected year
  // Fetch available years for the selected community
  const [years, setYears] = useState([]);

  // Fetch data when communityName or selectedYear changes
  useEffect(() => {
    if (communityName && selectedYear) {
      fetch(`/api/crimedata/byYear?community=${encodeURIComponent(communityName)}&year=${selectedYear}`)
        .then((response) => {
          if (!response.ok) {
            throw new Error("Error while getting crimedata for selected year");
          }
          return response.json();
        })
        .then((data) => {
          const months = data.map((entry) => entry.month); // Assuming the API returns data grouped by month for the selected year
          const crimeCounts = data.map((entry) => entry.totalCrimeCount);

          setChartData({
            labels: months,
            datasets: [
              {
                label: `Crime Count by Month in ${selectedYear}`,
                data: crimeCounts,
                backgroundColor: "rgba(75, 192, 192, 0.6)",
                borderColor: "rgba(75, 192, 192, 1)",
                borderWidth: 1,
              },
            ],
            rawData: data, // Store raw data for table view
          });
        })
        .catch((error) => console.error("Error fetching bar chart data:", error));
    }
  }, [communityName, selectedYear]);

  useEffect(() => {
    if (communityName) {
      fetch(`/api/crimedata/availableYears?community=${encodeURIComponent(communityName)}`)
        .then((response) => {
          if (!response.ok) {
            throw new Error("Error fetching available years");
          }
          return response.json();
        })
        .then((data) => setYears(data))
        .catch((error) => console.error("Error fetching years:", error));
    }
  }, [communityName]);


  const handleBarClick = (event, chart) => {
    alert("bar on click");
    const elements = chart.getElementsAtEventForMode(event.nativeEvent, "index", { intersect: true }, false);
    if (elements.length > 0) {
      const yearIndex = elements[0].index;
      const clickedYear = chartData.labels[yearIndex];
      onYearClick(clickedYear); // Notify the parent component
    }
  };

  return (
    <div>
      {communityName && <h3>Community: {communityName}</h3>}

      {/* Dropdown to select year */}
      <div style={{ marginBottom: "10px" }}>
        <label htmlFor="year">Select Year: </label>
        <select
          id="year"
          value={selectedYear || ""}
          onChange={(e) => setSelectedYear(e.target.value)}
        >
          <option value="">Select a Year</option>
          {years.map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>
      </div>

      {/* Buttons to switch between chart and table view */}
      <div style={{ marginBottom: "10px" }}>
        <button onClick={() => setViewMode("chart")}>View Chart</button>
        <button onClick={() => setViewMode("table")}>View Table</button>
      </div>

      {/* Conditionally render chart or table based on viewMode */}
      {viewMode === "chart" && chartData ? (
        <Bar
          data={chartData}
          options={{
            responsive: true,
            scales: {
              x: { title: { display: true, text: "Month" } },
              y: { title: { display: true, text: "Crime Count" }, beginAtZero: true },
            },
            onClick: handleBarClick,
          }}
        />
      ) : viewMode === "table" && chartData ? (
        <table border="1" cellPadding="8" style={{ width: "100%", marginTop: "10px" }}>
          <thead>
            <tr>
              <th>Month</th>
              <th>Crime Count</th>
            </tr>
          </thead>
          <tbody>
            {chartData.rawData.map((entry) => (
              <tr key={entry.month}>
                <td>{entry.month}</td>
                <td>{entry.totalCrimeCount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>Loading data...</p>
      )}
    </div>
  );
};

export default BarChartComponent;
