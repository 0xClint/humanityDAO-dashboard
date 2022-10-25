import React, { useEffect } from "react";
import { useStateContext } from "../contexts/ContextProvider";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { FetchAllProject } from "../redux/ProjectReducer";

const ProjectDetails = () => {
  const { currentColor } = useStateContext();
  const params = useParams();
  const dispatch = useDispatch();
  console.log(params.id);

  useEffect(() => {
    dispatch(
      FetchAllProject({
        // callback:()
      })
    );
  }, []);

  let projects = useSelector((data) => data.Projects.projects);
  const projectDetails = projects.filter((item) => item._id == params.id);
  console.log(projectDetails[0]);

  return (
    <div>
      <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
        <p className="text-lg text-gray-400">page</p>
        <p className="text-3xl font-extrabold tracking-tight text-slate-900">
          Project Details
        </p>
      </div>

      <div className="mainContainer m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl mx-4">
        <div className="headContainer flex justify-between mt-5 items-center">
          <p className="text-3xl font-extrabold  ">
            {projectDetails[0] ? projectDetails[0].title : "no title"}
          </p>
          <Link to="/tasks">
            <button
              style={{ backgroundColor: currentColor }}
              className="text-xl opacity-0.9 text-white hover:drop-shadow-xl rounded-md  p-3"
            >
              Show Tasks
            </button>
          </Link>
        </div>
        <div className="details text-lg my-14 gap-5 flex flex-col font-medium">
          <div className=" flex">
            Assignee :
            <div className="assigneeContainer flex">
              <div className="assignee bg-yellow-300 p-[1px] px-2 rounded-2xl text-white">
                assigmee
              </div>
            </div>
          </div>
          <p>
            Added On : {projectDetails[0] ? projectDetails[0].addedOn : "temp"}
          </p>
          <p>
            Added By :{" "}
            {projectDetails[0] ? projectDetails[0].addedBy.name : "temp"}
          </p>
        </div>
        {/* <div className="description">
          <h3 className="text-2xl font-semibold">Description :</h3>
          <p className="my-3 mr-10">
            do consequat. Duis aute irure dolor in reprehenderit in voluptate
            velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
            occaecat cupidatat non proident, sunt in culpa qui officia deserunt
            mollit anim id est laborum.
          </p>
        </div> */}
        <div className="commentSection my-32">
          <h3 className="text-2xl font-semibold">Comments :</h3>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetails;
