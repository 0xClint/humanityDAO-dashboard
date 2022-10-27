import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
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

  useEffect(() => {
    dispatch(
      UserMe({
        callback: async (msg, data, recall) => {
          // window.location.reload();
          setIsAdmin(JSON.parse(localStorage.getItem("Admin")));
        },
      })
    );
    console.log(isAdmin);
  }, [isAdmin]);

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
              <Route exact path="/" element={<Overview />} />
              <Route path="/overview" element={<Overview />} />

              {/* pages  */}
              {/* <Route
                path="/redirect-page"
                element={<Redirect to="/error-page" />}
              /> */}
              {/* {isAuth && <Navigate replace to="/login" />} */}

              <Route path="/login" element={<LoginPage />} />
              <Route path="/signup" element={<SignUpPage />} />
              <Route path="/projects" element={<Projects />} />
              <Route path="/projects/add" element={<ProjectForm />} />
              <Route path="/projects/edit/:id" element={<ProjectForm />} />
              <Route path="/employees" element={<Employees />} />
              <Route path="/tasks" element={<Tasks />} />
              <Route path="/tasks/:id" element={<TaskCard />} />
              <Route path="/tasks/subtasks/:id" element={<Todo />} />
              <Route path="projects/:id" element={<ProjectDetails />} />
              <Route path="/tasks/add" element={<TaskForm />} />
              <Route path="/tasks/edit/:id" element={<TaskForm />} />
              <Route
                path="/tasks/subtasks/form/:id"
                element={<SubTaskForm />}
              />
            </Routes>
          </div>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
