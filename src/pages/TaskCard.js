import React from "react";
import { useStateContext } from "../contexts/ContextProvider";
import Doughnut from "../components/Charts/Pie";
import { pieChartData } from "../assets/dummy";

const TaskCard = () => {
  const { currentColor } = useStateContext();
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
              <h2 className="text-3xl font-extrabold my-1">UI Development</h2>
              <p className="font-semibold">Project Name</p>
            </div>
            <div className="right h-26 w-24 bg-slate-400 rounded-[50%]">
              {/* <TaskPieChart data={pieChartData} /> */}
            </div>
          </div>
          <p className="my-8 text-lg mr-10">
            do consequat. Duis aute irure dolor in reprehenderit in voluptate
            velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
            occaecat cupidatat non proident, sunt in culpa qui officia deserunt
            mollit anim id est laborum. e cillum dolore equi officia deserunt
            mollit anim id est laborum. u fugiat nulla pariatur. Excepteur sint
            occaecat cupidatat non proident, sunt in culpa
          </p>
          <div className="taskOverview flex justify-between">
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
              <button
                style={{ backgroundColor: currentColor }}
                className="text-xl opacity-0.9 text-white hover:drop-shadow-xl rounded-md  p-3 ml-10 my-5"
              >
                Add Task
              </button>
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
