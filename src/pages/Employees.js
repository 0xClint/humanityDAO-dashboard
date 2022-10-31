import React, { useEffect } from "react";
import {
  GridComponent,
  Inject,
  ColumnsDirective,
  ColumnDirective,
  Search,
  Page,
} from "@syncfusion/ej2-react-grids";
import { useDispatch, useSelector } from "react-redux";
import { employeesData, employeesGrid } from "../assets/dummy";
import { Header } from "../components";
import { LeaderBoard } from "../redux/EmployeeReducer";

const Employees = () => {
  const toolbarOptions = ["Search"];
  const dispatch = useDispatch();

  const editing = { allowDeleting: true, allowEditing: true };

  useEffect(() => {
    dispatch(
      LeaderBoard({
        callback: async (msg, data, recall) => {
          // await console.log(msg, recall, data);
        },
      })
    );
  }, []);
  let employeesList = useSelector((data) => data.EmployeesList.list);
  console.log(useSelector((data) => data));

  return (
    <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
      <Header category="Page" title="Members" />
      <GridComponent
        dataSource={employeesList}
        width="auto"
        allowPaging
        allowSorting
        pageSettings={{ pageCount: 5 }}
        // editSettings={editing}
        toolbar={toolbarOptions}
      >
        <ColumnsDirective>
          {employeesGrid.map((item, index) => (
            <ColumnDirective key={index} {...item} />
          ))}
        </ColumnsDirective>
        <Inject services={[Search, Page]} />
      </GridComponent>
    </div>
  );
};
export default Employees;
