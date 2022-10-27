import React from "react";
import {
  AccumulationChartComponent,
  AccumulationSeriesCollectionDirective,
  AccumulationSeriesDirective,
} from "@syncfusion/ej2-react-charts";

const tempData = [{ y: 4 }, { y: 5 }];

const TaskPieChart = ({ data }) => {
  return (
    <AccumulationChartComponent id="charts">
      <AccumulationSeriesCollectionDirective>
        <AccumulationSeriesDirective
          // dataSource={tempData}
          dataSource={data}
          xName="y"
          yName="y"
          radius="80%"
        ></AccumulationSeriesDirective>
      </AccumulationSeriesCollectionDirective>
    </AccumulationChartComponent>
  );
};

export default TaskPieChart;
