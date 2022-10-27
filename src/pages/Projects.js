import React, { useEffect, useState } from "react";
import { Header } from "../components";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useStateContext } from "../contexts/ContextProvider";
import { Constants } from "../utils/Constants";
import { FetchAllProject } from "../redux/ProjectReducer";

const Projects = () => {
  const { currentColor, isAdmin, setIsAdmin } = useStateContext();
  const dispatch = useDispatch();
  const [ProjectCode, setProjectCode] = useState("hello");
  const navigate = useNavigate();

  const Projectcode = (string) => {
    var text = "";
    var arr = string.split(" ");
    for (let i = 0; i < arr.length; i++) {
      text += arr[i].substr(0, 1);
    }
    return text;
  };

  useEffect(() => {
    if (!localStorage.getItem(Constants.AUTH_TOKEN)) {
      console.log(localStorage.getItem(Constants.AUTH_TOKEN), "add");
      navigate("/login");
    }

    dispatch(
      FetchAllProject({
        // callback:()
      })
    );
  }, []);

  let projects = useSelector((data) => data.Projects.projects);
  // let projects = useSelector((data) => data);
  console.log(projects);
  return (
    <div className="">
      <div className="headerContainer m-2 md:m-10 mt-24 p-2 md:p-7 bg-white rounded-3xl">
        <Header category="Page" title="Projects" />
      </div>
      <div className="features flex justify-end px-20">
        {isAdmin && (
          <Link to="/projects/add">
            <button
              style={{ backgroundColor: currentColor }}
              className="text-xl opacity-0.9 text-white hover:drop-shadow-xl rounded-md w-56  p-3 ml-10 "
            >
              Create Project
            </button>
          </Link>
        )}
      </div>
      <div className="projectContainer flex flex-wrap gap-10 justify-start  m-2 md:m-10">
        {projects.map((item) => {
          return (
            <Link to={`/projects/${item._id}`}>
              <div className="projectCard flex flex-col justify-center shadow-md gap-5 h-[230px] w-[230px] hover:shadow-md hover:bg-[#F4F4F4] items-center bg-white rounded-3xl font-bold text-[1.2rem]">
                <div className="titleCoded h-20 w-20 bg-[#03C9D7] text-3xl text-[#F4F4F4] rounded-[4px] flex justify-center items-center">
                  {Projectcode(item.title)}
                </div>
                {item.title}
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default Projects;
