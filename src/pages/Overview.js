import React, { useEffect, useState } from "react";
import { earningData, pieChartData } from "../assets/dummy";
import { useStateContext } from "../contexts/ContextProvider";
import Doughnut from "../components/Charts/Pie";
import { Link, useNavigate } from "react-router-dom";
import Grid from "../components/Grid";
import { useDispatch, useSelector } from "react-redux";
import { FetchAllProject } from "../redux/ProjectReducer";
import { FetchAllTask } from "../redux/TaskReducer";
import GridTask from "../components/Gridtask";
import { Constants } from "../utils/Constants";
import { AuthRedirect } from "../components/AuthRedirect";

const Overview = () => {
  const {
    currentColor,
    setIsSidebar,
    isSidebar,
    activeMenu,
    setIsNavbar,
    isNavbar,
    setActiveMenu,
  } = useStateContext();
  const [user, setUser] = useState();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // setIsSidebar(true);
  // setIsNavbar(true);
  // setActiveMenu(true);

  useEffect(() => {
    if (!localStorage.getItem(Constants.AUTH_TOKEN)) {
      console.log(localStorage.getItem(Constants.AUTH_TOKEN));
      // console.log(user, "asf");
      navigate("/login");
    }
    setUser(JSON.parse(localStorage.getItem(Constants.USER_PROFILE)));
    dispatch(
      FetchAllProject({
        // callback:()
      })
    );
    dispatch(
      FetchAllTask({
        // callback:
      })
    );
  }, []);

  let projects = useSelector((data) => data.Projects.projects);
  let allTasks = useSelector((data) => data.AllTasks.tasks);
  console.log(projects, allTasks);
  return (
    <div className="mt-12">
      <div className="flex flex-wrap justify-center">
        <div className="w-[90%] bg-white dark:text-gray-200  dark:bg-secondary-dark-bg h-24 rounded-xl p-8 pt-9 m-3 bg-hero-pattern bg-no-repeat bg-cover bg-center">
          <div className="flex justify-between items-center">
            <div>
              {/* <p className="font-bold text-gray-400">Earnings</p> */}
              <p className="text-2xl font-bold">
                Hi {user},Welcome To Humanity DAO
              </p>
            </div>
          </div>
        </div>

        <div className="flex m-3 flex-wrap justify-center gap-6 items-center">
          {earningData.map((item) => (
            <div
              key={item.title}
              className="bg-white h-52 dark:text-gray-200 dark:bg-secondary-dark-bg md:w-60  p-4 pt-9 rounded-2xl "
            >
              <button
                type="button"
                style={{ color: item.iconColor, backgroundColor: item.iconBg }}
                className="text-2xl opacity-0.9 rounded-full  p-4 hover:drop-shadow-xl"
              >
                {item.icon}
              </button>
              <p className="mt-3">
                <span className="text-lg font-semibold">{item.amount}</span>
                <span className={`text-sm text-${item.pcColor} ml-2`}>
                  {item.percentage}
                </span>
              </p>
              <p className="text-sm text-gray-400  mt-1">{item.title}</p>
            </div>
          ))}
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
