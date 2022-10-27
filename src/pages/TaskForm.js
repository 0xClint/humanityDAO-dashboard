import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useStateContext } from "../contexts/ContextProvider";
import { AddTask, EditTask, FetchTask } from "../redux/TaskReducer";
import { FetchAllProject } from "../redux/ProjectReducer";
import { useParams, useNavigate } from "react-router-dom";

const TaskForm = () => {
  const { currentColor } = useStateContext();
  const [title, setTitle] = useState();
  const [isEdit, setIsEdit] = useState();
  const [project, setProject] = useState();
  const [description, setDescription] = useState();
  const dispatch = useDispatch();
  const params = useParams();

  const navigate = useNavigate();

  useEffect(() => {
    if (params.id) {
      setIsEdit(true);
    }
    dispatch(FetchAllProject({}));

    dispatch(
      FetchTask({
        query: params.id,
        callback: async ({ data }) => {
          await console.log(data);

          setTitle(JSON.parse(localStorage.getItem("EDIT TASK TITLE")).title);
          setDescription(
            JSON.parse(localStorage.getItem("EDIT TASK TITLE")).description
          );
        },
      })
    );
  }, []);

  let projects = useSelector((data) => data.Projects.projects);
  console.log(project, title);

  const handleClick = () => {
    // console.log("hello");
    const values = {
      data: {
        title,
        description,
      },
    };
    if (isEdit) {
      dispatch(
        EditTask({
          payload: values,
          query: JSON.parse(localStorage.getItem("EDIT TASK TITLE"))._id,
          callback: async (msg, data, recall) => {
            await console.log(msg, recall, data);
            navigate("/tasks");
            window.location.reload();
          },
        })
      );
    } else {
      dispatch(
        AddTask({
          payload: values,
          query: project,
          callback: async (msg, data, recall) => {
            await console.log(msg, recall, data);
            navigate("/tasks");
            window.location.reload();
          },
        })
      );
    }
  };

  return (
    <div>
      <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
        <p className="text-lg text-gray-400">page</p>
        <p className="text-3xl font-extrabold tracking-tight text-slate-900">
          Task
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
        {!isEdit && (
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
        )}
        <div className="question flex flex-col gap-2 w-[60%] my-8">
          <label htmlFor="">Description</label>
          <textarea
            className="
            block px-3 py-1.5 font-normal  text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition"
            id=""
            cols="30"
            rows="10"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
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
