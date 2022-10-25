import React from "react";
import {
  ColumnDirective,
  ColumnsDirective,
  Filter,
  GridComponent,
  Group,
  Inject,
  Page,
  Sort,
} from "@syncfusion/ej2-react-grids";

const GridTask = ({ data }) => {
  console.log(data);
  const pageSettings = { pageSize: 6 };
  return (
    <div>
      <GridComponent
        dataSource={data}
        allowPaging={true}
        pageSettings={pageSettings}
      >
        <ColumnsDirective>
          <ColumnDirective field="title" width="100" textAlign="Center" />
          <ColumnDirective field="addedOn" width="100" textAlign="Center" />
        </ColumnsDirective>
        <Inject services={[Page, Sort, Filter, Group]} />
      </GridComponent>
    </div>
  );
};

export default GridTask;
