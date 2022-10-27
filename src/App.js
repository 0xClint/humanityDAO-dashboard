import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Navigate as Redirect } from "react-router-dom";

import { FiSettings } from "react-icons/fi";
import { TooltipComponent } from "@syncfusion/ej2-react-popups";
import "./App.css";
import { Navbar, Sidebar, ThemeSettings } from "./components";
import { Overview, Employees } from "./pages";
import { useStateContext } from "./contexts/ContextProvider";
import {
  LoginPage,
  Projects,
  ProjectForm,
  Tasks,
  TaskCard,
  Todo,
  ProjectDetails,
  SignUpPage,
} from "./pages/index";
import TaskForm from "./pages/TaskForm";
import { useDispatch } from "react-redux";
import SubTaskForm from "./pages/SubTaskForm";
import { UserMe } from "./redux/AuthReducer";

function App() {
  
  const {
    activeMenu,
    currentColor,
    themeSettings,
    setThemeSettings,
    isSidebar,
    isNavbar,
    isAdmin,
    setIsAdmin,
  } = useStateContext();
  const dispatch = useDispatch();
  const isAuthenticated = Boolean(localStorage.getItem(Constants.AUTH_TOKEN))
  useEffect(() => {
    dispatch(
      UserMe({
        callback: async (msg, data, recall) => {
          // window.location.reload();
          console.log(data);
          setIsAdmin(data?.data?.user?.isSuperUser);
          // console.log(data?.data?.user)
          recall();
        },
      })
    );
    // console.log(isAdmin);
  }, []);

  return (
    <div className="App">
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
              {isSidebar && <Sidebar />}
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
              {isNavbar && <Navbar />}
            </div>
            {themeSettings && <ThemeSettings />}
            <Routes>
              {/* <Route path="/:id" element={<Overview />} /> */}
              <Route exact path="/" element={!isAuthenticated?<Redirect to="/login"/>:<Overview />} />
              <Route path="/overview" element={!isAuthenticated?<Redirect to="/login"/>:<Overview />} />

              {/* pages  */}
              {/* <Route
                path="/redirect-page"
                element={<Redirect to="/error-page" />}
              /> */}
              {/* {isAuth && <Navigate replace to="/login" />} */}

              <Route path="/login" element={isAuthenticated?<Redirect to="/"/>:<LoginPage />} />
              <Route path="/signup" element={isAuthenticated?<Redirect to="/"/>:<SignUpPage />} />
              <Route path="/projects" element={!isAuthenticated?<Redirect to="/login"/>:<Projects />} />
              <Route path="/projects/add" element={!isAuthenticated?<Redirect to="/login"/>:<ProjectForm />} />
              <Route path="/projects/edit/:id" element={!isAuthenticated?<Redirect to="/login"/>:<ProjectForm />} />
              <Route path="/employees" element={!isAuthenticated?<Redirect to="/login"/>:<Employees />} />
              <Route path="/tasks" element={!isAuthenticated?<Redirect to="/login"/>:<Tasks />} />
              <Route path="/tasks/:id" element={!isAuthenticated?<Redirect to="/login"/>:<TaskCard />} />
              <Route path="/tasks/subtasks/:id" element={!isAuthenticated?<Redirect to="/login"/>:<Todo />} />
              <Route path="projects/:id" element={!isAuthenticated?<Redirect to="/login"/>:<ProjectDetails />} />
              <Route path="/tasks/add" element={!isAuthenticated?<Redirect to="/login"/>:<TaskForm />} />
              <Route path="/tasks/edit/:id" element={!isAuthenticated?<Redirect to="/login"/>:<TaskForm />} />
              <Route
                path="/tasks/subtasks/form/:id"
                element={!isAuthenticated?<Redirect to="/login"/>:<SubTaskForm />}
              />
            </Routes>
          </div>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
