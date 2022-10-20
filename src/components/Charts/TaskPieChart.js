import React from "react";
import {
  AccumulationChartComponent,
  AccumulationSeriesCollectionDirective,
  AccumulationSeriesDirective,
} from "@syncfusion/ej2-react-charts";
// import { accData } from "datasource.ts";

const TaskPieChart = (accData) => {
  return (
    <AccumulationChartComponent id="charts">
      <AccumulationSeriesCollectionDirective>
        <AccumulationSeriesDirective
          dataSource={accData}
          xName="x"
          yName="y"
          radius="100%"
        ></AccumulationSeriesDirective>
      </AccumulationSeriesCollectionDirective>
    </AccumulationChartComponent>
  );
};

export default TaskPieChart;
