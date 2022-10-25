import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useStateContext } from "../contexts/ContextProvider";
import { AddTask } from "../redux/TaskReducer";
import { FetchAllProject } from "../redux/ProjectReducer";

const TaskForm = () => {
  const { currentColor } = useStateContext();
  const [title, setTitle] = useState();
  const [project, setProject] = useState();
  const [description, setDescription] = useState();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      FetchAllProject({
        // callback:()
      })
    );
  }, []);

  let projects = useSelector((data) => data.Projects.projects);
  console.log(project);

  const handleClick = () => {
    // console.log("hello");
    const values = {
      data: {
        title: "To-Do 3",
        description: "To-Do 3 brief",
      },
    };
    dispatch(
      AddTask({
        payload: values,
        query: project,
        callback: (msg, data, recall) => {
          console.log(msg, recall, data);
        },
      })
    );
  };

  return (
    <div>
      <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
        <p className="text-lg text-gray-400">page</p>
        <p className="text-3xl font-extrabold tracking-tight text-slate-900">
          Add Task
        </p>
      </div>
      <div className="md:m-10 mt-24 p-2 md:p-10 md:px-20 bg-white rounded-3xl ">
        <div className="question flex flex-col gap-2 w-[60%] my-8">
          <label htmlFor="">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="
          block px-3 py-1.5 font-normal  text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition"
          />
        </div>
        <div className="question flex flex-col gap-2 w-[60%] my-8">
          <label htmlFor="">Select Project</label>
          <select
            className="question flex flex-col gap-2 w-[60%] h-[32] border-2 rounded-sm border-zinc-500 my-2"
            value={project}
            onChange={(e) => {
              setProject(e.target.value);
            }}
            // className="input_field"
            required
          >
            <option value="none" selected>
              Select an Option
            </option>
            {projects.map((item) => {
              return <option value={item._id}>{item.title}</option>;
            })}
          </select>
        </div>
        <div className="question flex flex-col gap-2 w-[60%] my-8">
          <label htmlFor="">Description</label>
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
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

export default TaskForm;
