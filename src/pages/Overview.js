import React from "react";
import { earningData, pieChartData } from "../assets/dummy";
import { useStateContext } from "../contexts/ContextProvider";
import Doughnut from "../components/Charts/Pie";
import { Link } from "react-router-dom";
import Grid from "../components/Grid";
import Projects from "./Projects";

const Overview = () => {
  const { currentColor } = useStateContext();
  return (
    <div className="mt-12">
      <div className="flex flex-wrap justify-center">
        <div className="w-[90%] bg-white dark:text-gray-200  dark:bg-secondary-dark-bg h-44 rounded-xl p-8 pt-9 m-3 bg-hero-pattern bg-no-repeat bg-cover bg-center">
          <div className="flex justify-between items-center">
            <div>
              <p className="font-bold text-gray-400">Earnings</p>
              <p className="text-2xl">$63,448.78</p>
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
          <Grid />
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
          <Grid />
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
