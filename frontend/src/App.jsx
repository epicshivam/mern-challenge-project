import React from "react";
import BarChart from "./components/BarChart";
import PieChart from "./components/PieChart";
import Statistics from "./components/Statistics";
import TransactionsTable from "./components/TransactionsTable";

const App = () => {
  return (
    <div>
      <h1>MERN Stack Coding Challenge</h1>
      <Statistics />
      <BarChart />
      <PieChart />
      <TransactionsTable />
    </div>
  );
};

export default App;
