import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useStateContext } from "../contexts/ContextProvider";
import { FetchAllTask } from "../redux/TaskReducer";
import { EditSubTask } from "../redux/SubTaskReducer";
import { Constants } from "../utils/Constants";

const Tasks = () => {
  const { currentColor, isAdmin } = useStateContext();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleCheck = async (subtask) => {
    const values = {
      data: {
        title: subtask.title,
        description: subtask.description,
        dueOn: subtask.dueOn,
        assignedto: subtask.assignedto,
        // isComplete: ischeck,
        isComplete: !subtask.isComplete,
        _id: subtask._id,
      },
    };

    await dispatch(
      EditSubTask({
        payload: values,
        query: subtask._id,
        callback: async (msg, data, recall) => {
          await console.log(msg, recall, data);
        },
      })
    );
    // window.location.reload();
  };

  useEffect(() => {
    if (!localStorage.getItem(Constants.AUTH_TOKEN)) {
      // console.log(localStorage.getItem(Constants.AUTH_TOKEN), "add");
      navigate("/login");
    }

    dispatch(
      FetchAllTask({
        callback: async ({ data }) => {},
      })
    );
  }, []);
  let allTasks = useSelector((data) => data.AllTasks.tasks);
  console.log(allTasks);

  return (
    <div>
      <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
        <p className="text-lg text-gray-400">page</p>
        <p className="text-3xl font-extrabold tracking-tight text-slate-900">
          Tasks
        </p>
      </div>
      <div className="features flex justify-end px-20">
        {isAdmin && (
          <Link to={`/tasks/add`}>
            <button
              style={{ backgroundColor: currentColor }}
              className="text-xl opacity-0.9 text-white hover:drop-shadow-xl rounded-md w-32  p-3 ml-10 "
            >
              Add Task
            </button>
          </Link>
        )}
      </div>
      <div className="mainContainer m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl mx-4">
        {allTasks
          ? allTasks.map((item) => {
              // console.log(item);
              return (
                <div className="taskContent my-5">
                  <div className="headContent flex gap-14">
                    <div className="left">
                      <p>2/5 completed</p>
                      <Link to={`/tasks/${item._id}`}>
                        <h2 className="text-3xl font-extrabold my-1">
                          {item.title}
                        </h2>
                      </Link>
                      <p className="font-semibold">
                        {item.projectid ? item.projectid.title : ""}
                      </p>
                    </div>
                    {/* <div className="right h-26 w-24 bg-slate-400 rounded-[50%]"></div> */}
                  </div>
                  <p className="my-8 text-lg mr-10">
                    {item.description ? item.description : ""}
                  </p>
                  <div className="taskContainer ">
                    {item
                      ? item.subtasks.map((item) => (
                          <div className="task flex ml-5 gap-3 items-center my-5">
                            <input
                              className="h-6 w-6 border border-gray-300 rounded-3xl checked:bg-[#22A80D] transition duration-200"
                              type="checkbox"
                              value=""
                              // checked={ischeck}
                              checked={item.isComplete}
                              onChange={() => handleCheck(item)}
                            />
                            <Link to={`/tasks/subtasks/${item._id}`}>
                              <label className="text-xl cursor-pointer">
                                {item.title}
                              </label>
                            </Link>
                          </div>
                        ))
                      : "temp"}
                  </div>
                  {isAdmin && (
                    <Link to={`/tasks/subtasks/form/${item._id}`}>
                      <button
                        style={{ backgroundColor: currentColor }}
                        className="text-xl opacity-0.9 text-white hover:drop-shadow-xl rounded-md  p-3 ml-10 my-5"
                      >
                        Add SubTask
                      </button>
                    </Link>
                  )}
                  <div className="breakLine bg-black h-[1px] w-full my-14"></div>
                </div>
              );
            })
          : "TaskList"}
      </div>
    </div>
  );
};

export default Tasks;
