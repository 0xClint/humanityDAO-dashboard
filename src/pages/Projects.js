import React from "react";
import { Header } from "../components";
import { Link } from "react-router-dom";

const Projects = () => {
  return (
    <div className="">
      <div className="headerContainer m-2 md:m-10 mt-24 p-2 md:p-7 bg-white rounded-3xl">
        <Header category="Page" title="Projects" />
      </div>
      <div className="projectContainer flex flex-wrap gap-10 justify-start  m-2 md:m-10">
        <Link to="/projects/:id">
          <div className="projectCard flex justify-center h-[230px] w-[230px] hover:shadow-md items-center bg-white rounded-3xl font-bold text-[1.2rem]">
            Projects 1
          </div>
        </Link>
        <Link to="/projects/:id">
          <div className="projectCard flex justify-center h-[230px] w-[230px] hover:shadow-md items-center bg-white rounded-3xl font-bold text-[1.2rem]">
            Projects 1
          </div>
        </Link>
        <Link to="/projects/:id">
          <div className="projectCard flex justify-center h-[230px] w-[230px] hover:shadow-md items-center bg-white rounded-3xl font-bold text-[1.2rem]">
            Projects 1
          </div>
        </Link>
        <Link to="/projects/:id">
          <div className="projectCard flex justify-center h-[230px] w-[230px] hover:shadow-md items-center bg-white rounded-3xl font-bold text-[1.2rem]">
            Projects 1
          </div>
        </Link>
        <Link to="/projects/:id">
          <div className="projectCard flex justify-center h-[230px] w-[230px] hover:shadow-md items-center bg-white rounded-3xl font-bold text-[1.2rem]">
            Projects 1
          </div>
        </Link>
        <Link to="/projects/:id">
          <div className="projectCard flex justify-center h-[230px] w-[230px] hover:shadow-md items-center bg-white rounded-3xl font-bold text-[1.2rem]">
            Projects 1
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Projects;
