import React, { useEffect, useState } from "react";
// import { earningData, pieChartData } from "../assets/dummy";
import { useStateContext } from "../contexts/ContextProvider";
import Doughnut from "../components/Charts/Pie";
import { Link, useNavigate } from "react-router-dom";
import Grid from "../components/Grid";
import { useDispatch, useSelector } from "react-redux";
import { FetchAllProject } from "../redux/ProjectReducer";
import { FetchAllTask } from "../redux/TaskReducer";
import GridTask from "../components/Gridtask";
import { Constants } from "../utils/Constants";
import { BsKanban, BsPeopleFill } from "react-icons/bs";
import { GrTask } from "react-icons/gr";
import { totalSubTaskCount } from "../contexts/subTaskCount";
import { LeaderBoard } from "../redux/EmployeeReducer";

const Overview = () => {
  const { currentColor } = useStateContext();
  const [user, setUser] = useState();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem(Constants.AUTH_TOKEN)) {
      console.log(localStorage.getItem(Constants.AUTH_TOKEN));
      navigate("/login");
    }

    setUser(JSON.parse(localStorage.getItem(Constants.USER_PROFILE)));
    dispatch(FetchAllProject({}));
    dispatch(FetchAllTask({}));
    dispatch(
      LeaderBoard({
        callback: async (msg, data, recall) => {
          // await console.log(msg, recall, data);
        },
      })
    );
  }, []);

  let projects = useSelector(({Projects}) => Projects.projects);
  let allTasks = useSelector(({AllTasks}) => AllTasks.tasks);
  let employees = useSelector(({EmployeesList}) => EmployeesList.list);
  let subTaskCount = totalSubTaskCount(allTasks);
  console.log(allTasks);

  const pieChartData = [
    {
      x: "subTasks completed",
      y: subTaskCount[1],
      text: `${(subTaskCount[1] / subTaskCount[0]) * 100}%`,
    },
    {
      x: "subTasks in-complete",
      y: subTaskCount[2],
      text: `${(subTaskCount[2] / subTaskCount[0]) * 100}%`,
    },
  ];
  return (
    <div className="mt-12">
      <div className="flex flex-wrap justify-center">
        <div className="w-[90%] bg-white dark:text-gray-200  dark:bg-secondary-dark-bg h-24 rounded-xl p-8 pt-9 m-3 bg-hero-pattern bg-no-repeat bg-cover bg-center">
          <div className="flex justify-between items-center">
            <div>
              {/* <p className="font-bold text-gray-400">Earnings</p> */}
              <p className="text-2xl font-bold">
                Hi {user}, Welcome To Humanity DAO
              </p>
            </div>
          </div>
        </div>

        <div className="flex m-3 flex-wrap justify-center gap-6 items-center">
          <div className="bg-white h-52 dark:text-gray-200 dark:bg-secondary-dark-bg md:w-60  p-4 pt-9 rounded-2xl ">
            <button
              type="button"
              style={{ backgroundColor: currentColor }}
              className={`text-2xl opacity-0.9 rounded-full p-4 hover:drop-shadow-xl`}
            >
              <BsKanban className=" text-stone-100" />
            </button>
            <p className="mt-3 text-lg font-semibold ml-3">
              {projects ? projects.length : "0"}
            </p>
            <p className="text-sm text-gray-400 ml-3 mt-1">Total Projects</p>
          </div>
          <div className="bg-white h-52 dark:text-gray-200 dark:bg-secondary-dark-bg md:w-60  p-4 pt-9 rounded-2xl ">
            <button
              type="button"
              style={{ backgroundColor: currentColor }}
              className={`text-2xl opacity-0.9 rounded-full p-4 hover:drop-shadow-xl`}
            >
              <GrTask className=" text-white" />
            </button>
            <p className="mt-3 text-lg font-semibold ml-3">
              {allTasks ? allTasks.length : "0"}
            </p>
            <p className="text-sm text-gray-400 ml-3  mt-1">Total Tasks</p>
          </div>
          <div className="bg-white h-52 dark:text-gray-200 dark:bg-secondary-dark-bg md:w-60  p-4 pt-9 rounded-2xl ">
            <button
              type="button"
              style={{ backgroundColor: currentColor }}
              className={`text-2xl opacity-0.9 rounded-full p-4 hover:drop-shadow-xl`}
            >
              <BsKanban className=" text-stone-100" />
            </button>
            <div className="mt-3 text-lg font-semibold ml-3">
              {subTaskCount[0]}
            </div>
            <p className="text-sm text-gray-400 ml-3 mt-1">Total SubTasks</p>
          </div>
          <div className="bg-white h-52 dark:text-gray-200 dark:bg-secondary-dark-bg md:w-60  p-4 pt-9 rounded-2xl ">
            <button
              type="button"
              style={{ backgroundColor: currentColor }}
              className={`text-2xl opacity-0.9 rounded-full p-4 hover:drop-shadow-xl`}
            >
              <BsPeopleFill className="" />
            </button>
            <p className="mt-3 text-lg font-semibold ml-3">
              {employees.length}
            </p>
            <p className="text-sm text-gray-400 ml-3 mt-1">Total Employees</p>
          </div>
        </div>
        <div className="w-[70%] bg-white dark:text-gray-200  dark:bg-secondary-dark-bg rounded-xl p-8 pt-9 m-3 bg-hero-pattern bg-no-repeat bg-cover bg-center">
          <div className="flex justify-between items-center mb-5">
            <p className="font-bold text-[1.5rem] my-3">Projects</p>
            <Link to="/projects">
              <button
                style={{ backgroundColor: currentColor }}
                className="text-xl opacity-0.9 text-white hover:drop-shadow-xl rounded-md  p-3"
              >
                view all
              </button>
            </Link>
          </div>
          <Grid data={projects} />
        </div>
        <div className="w-[70%] bg-white dark:text-gray-200  dark:bg-secondary-dark-bg rounded-xl p-8 pt-9 m-3 bg-hero-pattern bg-no-repeat bg-cover bg-center">
          <div className="flex justify-between items-center mb-5">
            <p className="font-bold text-[1.5rem] my-3">Tasks</p>
            <Link to="/tasks">
              <button
                style={{ backgroundColor: currentColor }}
                className="text-xl opacity-0.9 text-white hover:drop-shadow-xl rounded-md  p-3"
              >
                view all
              </button>
            </Link>
          </div>
          <GridTask data={allTasks} />
        </div>
      </div>

      <div className="flex gap-10 flex-wrap justify-center">
        <div className="w-[80%] mt-10 flex gap-10 flex-wrap justify-center bg-white">
          <Doughnut
            id="chart-pie"
            data={pieChartData}
            // legendVisiblity={false}
            // height="full"
          />
        </div>
      </div>
    </div>
  );
};

export default Overview;
