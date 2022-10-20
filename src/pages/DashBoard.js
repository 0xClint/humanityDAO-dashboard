import React from "react";
import { FiSettings } from "react-icons/fi";
import { TooltipComponent } from "@syncfusion/ej2-react-popups";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "../App.css";
import { Navbar, Sidebar, ThemeSettings } from "../components";
// import { Overview, Employees } from "./pages";
import { useStateContext } from "../contexts/ContextProvider";
import {
  Overview,
  Login,
  Projects,
  ProjectForm,
  Employees,
  Tasks,
  TaskCard,
  Todo,
  ProjectDetails,
} from "./index";

const DashBoard = () => {
  const { activeMenu, currentColor, themeSettings, setThemeSettings } =
    useStateContext();

  return (
    <div className="w-[100vw]">
      <BrowserRouter>
        <div className="flex relative dark:bg-main-dark-bg">
          <div className="fixed right-4 bottom-4" style={{ zIndex: "1000" }}>
            <TooltipComponent content="Settings" position="Top">
              <button
                type="button"
                onClick={() => setThemeSettings(true)}
                style={{ background: currentColor, borderRadius: "50%" }}
                className="text-3xl text-white p-3 hover:drop-shadow-xl hover:bg-light-gray"
              >
                <FiSettings />
              </button>
            </TooltipComponent>
          </div>
          {activeMenu ? (
            <div className="w-72 fixed sidebar dark:bg-secondary-dark-bg bg-white ">
              <Sidebar />
            </div>
          ) : (
            <div className="w-0 dark:bg-secondary-dark-bg">Sidebar w-0</div>
          )}
          <div
            className={`dark:bg-main-dark-bg  bg-main-bg min-h-screen w-full ${
              activeMenu ? "md:ml-72" : "flex-2"
            }`}
          >
            <div className="fixed md:static bg-main-bg dark:bg-main-dark-bg navbar w-full ">
              <Navbar />
            </div>
            {themeSettings && <ThemeSettings />}
            <Routes>
              {/* DashBoard */}
              <Route path="/dashboard/" element={<DashBoard />} />
              {/* <Route path="/dashboard/" element={<Overview />} /> */}
              <Route path="/overview" element={<Overview />} />

              {/* pages  */}
              <Route path="/login" element={<Login />} />
              <Route path="/projects" element={<Projects />} />
              <Route path="/projects/form" element={<ProjectForm />} />
              <Route path="/employees" element={<Employees />} />
              <Route path="/tasks" element={<Tasks />} />
              <Route path="/tasks/:id" element={<TaskCard />} />
              <Route path="/tasks/p/:id" element={<Todo />} />
              <Route path="/projects/:id" element={<ProjectDetails />} />
            </Routes>
            {/* </div> */}
            {/* </div> */}
          </div>
        </div>
      </BrowserRouter>
    </div>
  );
};

export default DashBoard;
