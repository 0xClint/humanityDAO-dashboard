import React, { useEffect, useState } from "react";
import { useStateContext } from "../contexts/ContextProvider";
import { useDispatch, useSelector } from "react-redux";
import {
  AddProject,
  EditProject,
  FetchAllProject,
  FetchProject,
} from "../redux/ProjectReducer";
import { Link, useParams } from "react-router-dom";
import { LeaderBoard } from "../redux/EmployeeReducer";

const ProjectForm = () => {
  const { currentColor } = useStateContext();
  const [projectName, setProjectName] = useState();
  const [assignee, setAssignee] = useState();
  const dispatch = useDispatch();
  const params = useParams();
  // const projectDetail = useSelector((data) => data.Projects.project);

  useEffect(() => {
    console.log("hii");
    // setProjectName(projectDetail ? projectDetail.title : "sds");

    dispatch(
      LeaderBoard({
        callback: (msg, data, recall) => {},
      })
    );
    dispatch(
      FetchProject({
        query: params.id,
        callback: async ({ data }) => {
          await console.log(data);
          setProjectName(
            JSON.parse(localStorage.getItem("EDIT PROJECT TITLE"))
          );
        },
      })
    );
  }, []);

  const handleClick = () => {
    console.log("hello");

    const values = {
      data: {
        title: projectName,
        members: [assignee],
      },
    };

    dispatch(
      AddProject({
        payload: values,
        callback: (msg, data, recall) => {
          console.log(msg, recall, data.data);
        },
      })
    );
  };
  let employeesList = useSelector((data) => data.EmployeesList.list);
  // let employeesList = useSelector((data) => data.EmployeesList.list);
  return (
    <div>
      <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
        <p className="text-lg text-gray-400">page</p>
        <p className="text-3xl font-extrabold tracking-tight text-slate-900">
          Project
        </p>
      </div>
      <div className="md:m-10 mt-24 p-2 md:p-10 md:px-20 bg-white rounded-3xl ">
        <div className="question flex flex-col gap-2 w-[60%] my-8">
          <label htmlFor="">Project Name</label>
          <input
            type="text"
            value={projectName}
            onChange={(e) => setProjectName(e.target.value)}
            className="
            block px-3 py-1.5 font-normal  text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition"
          />
        </div>
        <div className="question flex flex-col gap-2 w-[60%] my-8">
          <label htmlFor="">Assignee</label>
          <select
            className="question flex flex-col gap-2 w-[60%] h-[32] border-2 rounded-sm border-zinc-500 my-2"
            value={assignee}
            onChange={(e) => {
              setAssignee(e.target.value);
            }}
            required
          >
            <option value="none" selected>
              Select an Option
            </option>
            {employeesList
              ? employeesList.map((item) => {
                  return <option value={item._id}>{item.name}</option>;
                })
              : ""}
          </select>
        </div>
        <Link to={`/projects`}>
          <button
            style={{ backgroundColor: currentColor }}
            onClick={() => handleClick()}
            className="text-xl opacity-0.9 text-white hover:drop-shadow-xl rounded-md w-32 p-3"
          >
            Submit
          </button>
        </Link>
      </div>
    </div>
  );
};

export default ProjectForm;
