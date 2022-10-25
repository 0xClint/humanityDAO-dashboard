import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useStateContext } from "../contexts/ContextProvider";
import { FetchAllTask } from "../redux/TaskReducer";
import { EditSubTask } from "../redux/SubTaskReducer";
import { Constants } from "../utils/Constants";

const Tasks = () => {
  const { currentColor } = useStateContext();
  const [ischeck, setIsCheck] = useState(false);
  const [isChange, setIsChange] = useState(false);
  const dispatch = useDispatch();
  let allTasks = useSelector((data) => data.AllTasks.tasks);
  const navigate = useNavigate();
  console.log(allTasks);

  const handleCheck = async (subtask) => {
    setIsCheck(!subtask.isComplete);
    setIsChange(!isChange);
    // console.log(subtask, ischeck);

    const values = {
      data: {
        title: subtask.title,
        description: subtask.description,
        dueOn: subtask.dueOn,
        assignedto: subtask.assignedto,
        isComplete: ischeck,
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
      console.log(localStorage.getItem(Constants.AUTH_TOKEN), "add");
      navigate("/login");
    }

    dispatch(
      FetchAllTask({
        // callback:
      })
    );
  }, [isChange]);

  return (
    <div>
      <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
        <p className="text-lg text-gray-400">page</p>
        <p className="text-3xl font-extrabold tracking-tight text-slate-900">
          Tasks
        </p>
      </div>
      <div className="features flex justify-end px-20">
        <Link to={`/tasks/form`}>
          <button
            style={{ backgroundColor: currentColor }}
            className="text-xl opacity-0.9 text-white hover:drop-shadow-xl rounded-md w-32  p-3 ml-10 "
          >
            Add Task
          </button>
        </Link>
        {/* <button
          style={{ backgroundColor: currentColor }}
          className="text-xl opacity-0.9 text-white hover:drop-shadow-xl rounded-md w-32  p-3 ml-10 "
        >
          Sort
        </button>
        <button
          style={{ backgroundColor: currentColor }}
          className="text-xl opacity-0.9 text-white hover:drop-shadow-xl rounded-md w-32  p-3 ml-10 "
        >
          Filter
        </button> */}
      </div>
      <div className="mainContainer m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl mx-4">
        {allTasks.map((item) => {
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
                  <p className="font-semibold">{item.projectid.title}</p>
                </div>
                <div className="right h-26 w-24 bg-slate-400 rounded-[50%]">
                  {/* <TaskPieChart data={pieChartData} /> */}
                </div>
              </div>
              <p className="my-8 text-lg mr-10">{item.description}</p>
              <div className="taskContainer ">
                {/* <Link to="/tasks/p/:id">
                  <div className="task flex ml-5 gap-3 items-center my-5">
                    <input
                      className="h-6 w-6 border border-gray-300 rounded-3xl checked:bg-[#22A80D] transition duration-200"
                      type="checkbox"
                      value=""
                    />
                    <label className="text-xl">To-Do 1</label>
                    <div
                      className="bg-[#2C4DFC] rounded-xl text-white text-sm cursor-pointer"
                      style={{ backgroundColor: currentColor }}
                    >
                      <p className="mx-3 my-1">5 Comments</p>
                    </div>
                  </div>
                </Link> */}
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
              <Link to={`/tasks/subtasks/form/${item._id}`}>
                <button
                  style={{ backgroundColor: currentColor }}
                  className="text-xl opacity-0.9 text-white hover:drop-shadow-xl rounded-md  p-3 ml-10 my-5"
                >
                  Add SubTask
                </button>
              </Link>
              <div className="breakLine bg-black h-[1px] w-full my-14"></div>
            </div>
          );
        })}
        {/* <div className="taskContent my-5">
          <div className="headContent flex gap-14">
            <div className="left">
              <p>2/5 completed</p>
              <Link to="/tasks/:id">
                <h2 className="text-3xl font-extrabold my-1">UI Development</h2>
              </Link>
              <p className="font-semibold">Project Name</p>
            </div>
            <div className="right h-26 w-24 bg-slate-400 rounded-[50%]">
              <TaskPieChart data={pieChartData} />
            </div>
          </div>
          <p className="my-8 text-lg mr-10">
            do consequat. Duis aute irure dolor in reprehenderit in voluptate
            velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
            occaecat cupidatat non proident, sunt in culpa qui officia deserunt
            mollit anim id est laborum.
          </p>
          <div className="taskContainer ">
            <Link to="/tasks/p/:id">
              <div className="task flex ml-5 gap-3 items-center my-5">
                <input
                  className="h-6 w-6 border border-gray-300 rounded-3xl checked:bg-[#22A80D] transition duration-200"
                  type="checkbox"
                  value=""
                />
                <label className="text-xl">To-Do 1</label>
                <div
                  className="bg-[#2C4DFC] rounded-xl text-white text-sm cursor-pointer"
                  style={{ backgroundColor: currentColor }}
                >
                  <p className="mx-3 my-1">5 Comments</p>
                </div>
              </div>
            </Link>
            <div className="task flex ml-5 gap-3 items-center my-5">
              <input
                className="h-6 w-6 border border-gray-300 rounded-3xl checked:bg-[#22A80D] transition duration-200"
                type="checkbox"
                value=""
              />
              <label className="text-xl">To-Do 1</label>
            </div>
            <div className="task flex ml-5 gap-3 items-center my-5">
              <input
                className="h-6 w-6 border border-gray-300 rounded-3xl checked:bg-[#22A80D] transition duration-200"
                type="checkbox"
                value=""
                checked
              />
              <label className="text-xl">To-Do 1</label>
            </div>
          </div>
          <button
            style={{ backgroundColor: currentColor }}
            className="text-xl opacity-0.9 text-white hover:drop-shadow-xl rounded-md  p-3 ml-10 my-5"
          >
            Add Task
          </button>
          <div className="breakLine bg-black h-[1px] w-full my-14"></div>
        </div> */}
        {/* <div className="taskContent my-5">
          <div className="headContent flex gap-14">
            <div className="left">
              <p>2/5 completed</p>
              <h2 className="text-3xl font-extrabold my-1">UI Development</h2>
              <p className="font-semibold">Project Name</p>
            </div>
            <div className="right h-26 w-24 bg-slate-400 rounded-[50%]">
              <TaskPieChart data={pieChartData} /> 
            </div>
          </div>
          <p className="my-8 text-lg mr-10">
            do consequat. Duis aute irure dolor in reprehenderit in voluptate
            velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
            occaecat cupidatat non proident, sunt in culpa qui officia deserunt
            mollit anim id est laborum.
          </p>
          <div className="taskContainer ">
            <div className="task flex ml-5 gap-3 items-center my-5">
              <input
                className="h-6 w-6 border border-gray-300 rounded-3xl checked:bg-[#22A80D] transition duration-200"
                type="checkbox"
                value=""
              />
              <label className="text-xl">To-Do 1</label>
              <div
                className="bg-[#2C4DFC] rounded-xl text-white text-sm cursor-pointer"
                style={{ backgroundColor: currentColor }}
              >
                <p className="mx-3 my-1">5 Comments</p>
              </div>
            </div>
            <div className="task flex ml-5 gap-3 items-center my-5">
              <input
                className="h-6 w-6 border border-gray-300 rounded-3xl checked:bg-[#22A80D] transition duration-200"
                type="checkbox"
                value=""
              />
              <label className="text-xl">To-Do 1</label>
            </div>
            <div className="task flex ml-5 gap-3 items-center my-5">
              <input
                className="h-6 w-6 border border-gray-300 rounded-3xl checked:bg-[#22A80D] transition duration-200"
                type="checkbox"
                value=""
                checked
              />
              <label className="text-xl">To-Do 1</label>
            </div>
          </div>
          <button
            style={{ backgroundColor: currentColor }}
            className="text-xl opacity-0.9 text-white hover:drop-shadow-xl rounded-md  p-3 ml-10 my-5"
          >
            Add Task
          </button>
          <div className="breakLine bg-black h-[1px] w-full my-14"></div>
        </div> */}
      </div>
    </div>
  );
};

export default Tasks;
