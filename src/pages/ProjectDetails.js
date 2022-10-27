import React, { useEffect } from "react";
import { useStateContext } from "../contexts/ContextProvider";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { DeleteProject, FetchAllProject } from "../redux/ProjectReducer";

const ProjectDetails = () => {
  const { currentColor, isAdmin } = useStateContext();
  const params = useParams();
  const dispatch = useDispatch();
  const navigation = useNavigate();
  // console.log(params.id);

  useEffect(() => {
    dispatch(
      FetchAllProject({
        // callback:()
      })
    );
  }, []);

  const handleDelete = (id) => {
    console.log(id);
    dispatch(
      DeleteProject({
        query: id,
        callback: async ({ data }) => {
          await console.log(data);
          navigation("/projects");
        },
      })
    );
  };

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
          {isAdmin && (
            <div className="flex gap-5">
              <Link to="/tasks">
                <button
                  style={{ backgroundColor: currentColor }}
                  className="text-xl opacity-0.9 text-white hover:drop-shadow-xl rounded-md  p-3"
                >
                  Show Tasks
                </button>
              </Link>
              <Link
                to={
                  projectDetails[0]
                    ? `/projects/edit/${projectDetails[0]._id}`
                    : ""
                }
              >
                <button
                  style={{ backgroundColor: currentColor }}
                  className="text-xl opacity-0.9 text-white hover:drop-shadow-xl rounded-md  p-3"
                >
                  Edit Project
                </button>
              </Link>

              <button
                style={{ backgroundColor: currentColor }}
                className="text-xl opacity-0.9 text-white hover:drop-shadow-xl rounded-md  p-3"
                onClick={() => handleDelete(projectDetails[0]._id)}
              >
                Delete Project
              </button>
            </div>
          )}
        </div>
        <div className="details text-lg my-14 gap-5 flex flex-col font-medium">
          <div className=" flex">
            Assignee :
            <div className="assigneeContainer flex gap-3">
              {projectDetails[0]
                ? projectDetails[0].members.map((item) => {
                    // console.log(item.name);
                    return (
                      <div className="assignee bg-yellow-300 p-[1px] px-2 rounded-2xl text-white">
                        {item.name}
                      </div>
                    );
                  })
                : ""}
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
      </div>
    </div>
  );
};

export default ProjectDetails;
