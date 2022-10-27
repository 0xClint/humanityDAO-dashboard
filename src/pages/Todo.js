import React, { useEffect, useState } from "react";
import { useStateContext } from "../contexts/ContextProvider";
import { useDispatch, useSelector } from "react-redux";
import { FetchSubTask } from "../redux/SubTaskReducer";
import { useParams } from "react-router-dom";
import { GetCommentSubTask, AddCommentTask } from "../redux/CommentReducer";
import { BiUserCircle } from "react-icons/bi";

const Todo = () => {
  const { currentColor, isAdmin } = useStateContext();
  const dispatch = useDispatch();
  const [comment, setComment] = useState("");
  const params = useParams();
  console.log(params.id);

  useEffect(() => {
    console.log("Hello");
    dispatch(FetchSubTask({ query: params.id }));
    dispatch(
      GetCommentSubTask({
        query: params.id,
        callback: async ({ data }) => {
          await console.log(data);
        },
      })
    );
  }, []);

  const handleComment = () => {
    const values = {
      data: {
        text: comment,
      },
      subtaskid: params.id,
    };

    dispatch(
      AddCommentTask({
        payload: values,
        callback: async ({ data }) => {
          await console.log(data);
          window.location.reload();
        },
      })
    );
  };

  let subTaskDetails = useSelector((data) => data.SubTask.subtask);
  const allComments = useSelector((data) => data.Comments.comments);
  console.log(allComments);

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
          {/* <input
            className="h-10 w-10 border border-gray-300 transition duration-200"
            type="checkbox"
            value=""
          /> */}
          <label className="text-3xl font-bold">
            {subTaskDetails ? subTaskDetails.title : ""}
          </label>
        </div>
        <div className="details text-lg my-14 gap-5 flex flex-col font-medium">
          {/* <p>
            Project :
            {subTaskDetails ? subTaskDetails.projectid.title : "wdwdvdwdv"}
          </p> */}
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
          {/* <p>TimeLine :</p> */}
        </div>
        <div className="description">
          <h3 className="text-2xl font-semibold">Description :</h3>
          <p className="my-3 mr-10">
            {subTaskDetails ? subTaskDetails.description : "s"}
          </p>
        </div>
        <div className="commentSection my-16">
          <h3 className="text-2xl font-semibold">Comments :</h3>
          <div className="commentContainer flex flex-col mx-4 my-5 ">
            {allComments
              ? allComments.map((item) => {
                  return (
                    <div className="comment flex justify-start items-center gap-5  rounded-2xl my-3 w-full">
                      <BiUserCircle
                        className="text-[3rem]"
                        style={{ color: currentColor }}
                      />
                      <div className="comment bg-light-gray py-3 px-5 rounded-2xl">
                        <p className="font-semibold">{item.addedBy.name}</p>
                        <p className="text-lg">{item.text}</p>
                      </div>
                    </div>
                  );
                })
              : ""}
            <div className="commentInput flex my-10">
              <input
                type="text"
                className="
                
            block px-3 py-1.5 font-normal  text-gray-700 bg-white bg-clip-padding border-solid border border-gray-300 transition"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              />
              <button
                style={{ backgroundColor: currentColor }}
                onClick={() => handleComment()}
                className="text-xl  text-white hover:drop-shadow-xl rounded-md w-48 p-3 "
              >
                Add Comment
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Todo;
