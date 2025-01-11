import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import API from "../services/api";

const BarChart = () => {
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    const fetchChartData = async () => {
      try {
        const response = await API.get("/transactions/bar-data");
        setChartData(response.data);
      } catch (error) {
        console.error("Error fetching bar chart data:", error);
      }
    };

    fetchChartData();
  }, []);

  return (
    <div>
      {chartData ? (
        <Bar
          data={chartData}
          options={{
            responsive: true,
            plugins: {
              legend: { position: "top" },
              title: { display: true, text: "Bar Chart Example" },
            },
          }}
        />
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default BarChart;
