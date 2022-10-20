import React from "react";
import Doughnut from "../../components/Charts/Pie";
import { ecomPieChartData, pieChartData } from "../../assets/dummy";

const Pie = () => {
  return (
    <div>
      <div className="m-4 md:m-10 mt-24 p-10 bg-white dark:bg-secondary-dark-bg rounded-3xl">
        {/* <ChartsHeader category="Pie" title="Project Cost Breakdown" /> */}
        <div className="w-full">
          <Doughnut
            id="chart-pie"
            data={pieChartData}
            // legendVisiblity
            height="full"
          />
        </div>
      </div>
    </div>
  );
};

export default Pie;
