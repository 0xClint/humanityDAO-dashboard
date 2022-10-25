import React, { useState } from "react";
import { useStateContext } from "../contexts/ContextProvider";
import { useDispatch } from "react-redux";
import { AddProject } from "../redux/ProjectReducer";

const ProjectForm = () => {
  const { currentColor } = useStateContext();
  const [projectName, setProjectName] = useState();
  const dispatch = useDispatch();

  const handleClick = () => {
    console.log("hello");

    const values = {
      data: {
        title: projectName,
        members: [],
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
          <input
            type="text"
            className="
          block px-3 py-1.5 font-normal  text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition"
          />
        </div>
        <button
          style={{ backgroundColor: currentColor }}
          onClick={() => handleClick()}
          className="text-xl opacity-0.9 text-white hover:drop-shadow-xl rounded-md w-32 p-3"
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default ProjectForm;
