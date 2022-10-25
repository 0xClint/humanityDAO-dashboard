import React, { useEffect, useState } from "react";
import { useStateContext } from "../contexts/ContextProvider";
import Doughnut from "../components/Charts/Pie";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { EditSubTask } from "../redux/SubTaskReducer";
import { pieChartData } from "../assets/dummy";
import { FetchAllTask } from "../redux/TaskReducer";

const TaskCard = () => {
  const { currentColor } = useStateContext();
  const params = useParams();
  const [ischeck, setIsCheck] = useState(false);
  const [isChange, setIsChange] = useState(false);
  const dispatch = useDispatch();

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
    console.log("Hello");
    dispatch(
      FetchAllTask({
        // callback:
      })
    );
  }, [isChange]);

  const allTasks = useSelector((data) => data.AllTasks.tasks);
  // console.log(allTasks);
  let TaskDetails = allTasks.filter((item) => item._id == params.id);
  console.log(TaskDetails[0]);

  return (
    <div>
      <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
        <p className="text-lg text-gray-400">page</p>
        <p className="text-3xl font-extrabold tracking-tight text-slate-900">
          Tasks
        </p>
      </div>
      <div className="mainContainer m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl mx-4">
        <div className="taskContent my-5">
          <div className="headContent flex gap-14">
            <div className="left">
              <p>2/5 completed</p>
              <h2 className="text-3xl font-extrabold my-1">
                {TaskDetails[0] ? TaskDetails[0].title : "temp"}
              </h2>
              <p className="font-semibold">
                {TaskDetails[0] ? TaskDetails[0].projectid.title : "temp"}
              </p>
            </div>
            <div className="right h-26 w-24 bg-slate-400 rounded-[50%]"></div>
          </div>
          <p className="my-8 text-lg mr-10">
            {TaskDetails[0] ? TaskDetails[0].description : "temp"}
          </p>
          <div className="taskOverview flex justify-between">
            <div className="taskContainer ">
              {TaskDetails[0]
                ? TaskDetails[0].subtasks.map((item) => (
                    <div className="task flex ml-5 gap-3 items-center my-5">
                      <input
                        className="h-6 w-6 border border-gray-300 rounded-3xl checked:bg-[#22A80D] transition duration-200"
                        type="checkbox"
                        value=""
                        checked={item.isComplete}
                        onChange={() => handleCheck(item)}
                      />
                      <label className="text-xl">{item.title}</label>
                    </div>
                  ))
                : "temp"}

              <Link
                to={
                  TaskDetails[0]
                    ? `/tasks/subtasks/form/${TaskDetails[0]._id}`
                    : `/tasks/subtasks/form/`
                }
              >
                <button
                  style={{ backgroundColor: currentColor }}
                  className="text-xl opacity-0.9 text-white hover:drop-shadow-xl rounded-md  p-3 ml-10 my-5"
                >
                  Add SubTask
                </button>
              </Link>
            </div>
            <div className="rightPieChart w-[70%] flex justify-center items-center">
              <Doughnut
                id="chart-pie"
                data={pieChartData}
                // legendVisiblity={false}
                height="full"
              />
            </div>
            {/* <div className="breakLine bg-black h-[1px] w-full my-14"></div> */}
          </div>
        </div>
        <div className="commentSection my-16">
          <h3 className="text-2xl font-semibold">Comments :</h3>
        </div>
      </div>
    </div>
  );
};

export default TaskCard;
