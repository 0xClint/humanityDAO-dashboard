import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FetchSubTask } from "../redux/SubTaskReducer";
import { useParams } from "react-router-dom";

const Todo = () => {
  const dispatch = useDispatch();
  const params = useParams();
  console.log(params.id);

  useEffect(() => {
    console.log("Hello");
    dispatch(FetchSubTask({ query: params.id }));
  }, []);

  let subTaskDetails = useSelector((data) => data.SubTask.subtask);

  return (
    <div>
      <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
        <p className="text-lg text-gray-400">page</p>
        <p className="text-3xl font-extrabold tracking-tight text-slate-900">
          To-do details
        </p>
      </div>
      <div className="mainContainer m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl mx-4">
        <div className="task flex gap-7 items-center my-5">
          <input
            className="h-10 w-10 border border-gray-300 transition duration-200"
            type="checkbox"
            value=""
          />
          <label className="text-3xl font-bold">
            {subTaskDetails ? subTaskDetails.title : ""}
          </label>
        </div>
        <div className="details text-lg my-14 gap-5 flex flex-col font-medium">
          <p>
            Project : {subTaskDetails ? subTaskDetails.projectid.title : "s"}
          </p>
          <div className="flex">
            <p className=" mr-2">Assignees :</p>
            {subTaskDetails
              ? subTaskDetails.assignedto.map((item) => (
                  <div className=" bg-yellow-300 p-[1px] px-2 rounded-2xl text-white">
                    {item.name}
                  </div>
                ))
              : "s"}
          </div>
          <p>Due On : {subTaskDetails ? subTaskDetails.dueOn : "s"}</p>
          <p>TimeLine :</p>
        </div>
        <div className="description">
          <h3 className="text-2xl font-semibold">Description :</h3>
          <p className="my-3 mr-10">
            {subTaskDetails ? subTaskDetails.description : "s"}
          </p>
        </div>
        <div className="commentSection my-32">
          <h3 className="text-2xl font-semibold">Comments :</h3>
        </div>
      </div>
    </div>
  );
};

export default Todo;
