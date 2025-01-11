import React, { useEffect, useState } from "react";
import axios from "axios";

const Statistics = ({ month }) => {
  const [stats, setStats] = useState({
    totalSales: 0,
    soldItems: 0,
    unsoldItems: 0,
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await axios.get("/api/statistics", {
          params: { month },
        });
        setStats(response.data);
      } catch (error) {
        console.error("Error fetching statistics:", error);
      }
    };
    fetchStats();
  }, [month]);

  return (
    <div>
      <h2>Statistics</h2>
      <p>Total Sales: {stats.totalSales}</p>
      <p>Sold Items: {stats.soldItems}</p>
      <p>Unsold Items: {stats.unsoldItems}</p>
    </div>
  );
};

export default Statistics;
