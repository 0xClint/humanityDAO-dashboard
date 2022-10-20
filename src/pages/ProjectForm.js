import React from "react";
import { useStateContext } from "../contexts/ContextProvider";

const ProjectForm = () => {
  const { currentColor } = useStateContext();
  return (
    <div>
      <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
        <p className="text-lg text-gray-400">page</p>
        <p className="text-3xl font-extrabold tracking-tight text-slate-900">
          Edit Project
        </p>
      </div>
      <form className="md:m-10 mt-24 p-2 md:p-10 md:px-20 bg-white rounded-3xl ">
        <div className="question flex flex-col gap-2 w-[60%] my-8">
          <label htmlFor="">Project Name</label>
          <input
            type="text"
            className="
          block px-3 py-1.5 font-normal  text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition"
          />
        </div>
        <div className="question flex flex-col gap-2 w-[60%] my-8">
          <label htmlFor="">Assignee</label>
          <input
            type="text"
            className="
          block px-3 py-1.5 font-normal  text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition"
          />
        </div>
        <div className="question flex flex-col gap-2 w-[60%] my-8">
          <label htmlFor="">Due on</label>
          <input
            type="text"
            className="
          block px-3 py-1.5 font-normal  text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition"
          />
        </div>
        <div className="question flex flex-col gap-2 w-[60%] my-8">
          <label htmlFor="">Timeline</label>
          <input
            type="text"
            className="
          block px-3 py-1.5 font-normal  text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition"
          />
        </div>
        <div className="question flex flex-col gap-2 w-[60%] my-8">
          <label htmlFor="">Description</label>
          <textarea
            className="block px-3 py-1.5 font-normal  text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition"
            cols="30"
            rows="10"
          ></textarea>
        </div>
        <button
          style={{ backgroundColor: currentColor }}
          className="text-xl opacity-0.9 text-white hover:drop-shadow-xl rounded-md w-32 p-3"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default ProjectForm;
