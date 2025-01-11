import React, { useEffect, useState } from "react";
import { Pie } from "react-chartjs-2";
import API from "../services/api";

const PieChart = () => {
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    const fetchPieData = async () => {
      try {
        const response = await API.get("/transactions/pie-data");
        setChartData({
          labels: response.data.labels, // e.g., ['Sold', 'Unsold']
          datasets: [
            {
              label: "Transaction Distribution",
              data: response.data.data, // e.g., [30, 70]
              backgroundColor: ["#36A2EB", "#FF6384"], // Customize colors
              hoverBackgroundColor: ["#36A2EB", "#FF6384"],
            },
          ],
        });
      } catch (error) {
        console.error("Error fetching pie chart data:", error);
      }
    };

    fetchPieData();
  }, []);

  return (
    <div>
      <h3>Transaction Distribution</h3>
      {chartData ? (
        <Pie
          data={chartData}
          options={{
            responsive: true,
            plugins: {
              legend: {
                position: "top",
              },
              title: {
                display: true,
                text: "Pie Chart of Transactions",
              },
            },
          }}
        />
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default PieChart;
