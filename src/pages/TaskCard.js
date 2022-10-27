import React, { useEffect, useState } from "react";
import { useStateContext } from "../contexts/ContextProvider";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { EditSubTask } from "../redux/SubTaskReducer";
import { DeleteTask, FetchAllTask, UpdateSubTaskInCache } from "../redux/TaskReducer";
import TaskPieChart from "../components/Charts/TaskPieChart";
import { GetCommentTask } from "../redux/CommentReducer";

const TaskCard = () => {
  const { currentColor, isAdmin } = useStateContext();
  const params = useParams();

  const dispatch = useDispatch();
  const navigation = useNavigate();
  let count = [0, 0, 0];

  // useEffect(() => {
  //   window.scrollTo({ top: 0, left: 0 });
  // }, []);

  const handleCheck = async (subtask,taskid) => {
    const values = {
      data: {
        title: subtask.title,
        _id:subtask._id,
        description: subtask.description,
        dueOn: subtask.dueOn,
        assignedto: subtask.assignedto,
        isComplete: !subtask.isComplete,
      },
    };
    dispatch(UpdateSubTaskInCache({...values.data,taskid}
      ))
    dispatch(
      EditSubTask({
        payload: values,
        query: subtask._id,
        callback: async (msg, data, recall) => {
          if(msg === "error"){
            dispatch(UpdateSubTaskInCache({...values.data,taskid}
              ))
          }
          recall();
        },
      })
    );
  };
  const allTasks = useSelector((data) => data.AllTasks.tasks);
  const allComments = useSelector((data) => data.Comments.comments);
  const [TaskDetails,setTaskDetails] = useState(allTasks.filter((item) => item._id == params.id));
  
  // console.log(allComments);
  useEffect(()=>{
    setTaskDetails(allTasks.filter((item) => item._id == params.id));
  },[allTasks])

  const handleDelete = (id) => {
    console.log(id);
    dispatch(
      DeleteTask({
        query: id,
        callback: async ({ data }) => {
          await console.log(data);
          navigation("/tasks");
          window.location.reload();
        },
      })
    );
  };

  useEffect(() => {
    dispatch(FetchAllTask({}));
    dispatch(
      GetCommentTask({
        query: params.id,
        callback: async ({ data }) => {
          await console.log(data);
        },
      })
    );
  }, []);
  // count = TaskAnalytics(TaskDetails[0]);
  const TaskAnalytics = () => {
    if (TaskDetails[0]) {
      TaskDetails[0].subtasks.map((item) => {
        if (item.isComplete) {
          count[0]++;
          count[1]++;
        } else {
          count[0]++;
          count[2]++;
        }
      });
    }
  };
  TaskAnalytics();

  console.log(count);

  return (
    <div>
      <div className="m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl">
        <p className="text-lg text-gray-400">page</p>
        <p className="text-3xl font-extrabold tracking-tight text-slate-900">
          Tasks
        </p>
      </div>
      <div className="features flex justify-end px-20">
        {isAdmin && (
          <Link
            to={
              TaskDetails[0] && TaskDetails[0]._id
                ? `/tasks/edit/${TaskDetails[0]._id}`
                : "/tasks"
            }
          >
            <button
              style={{ backgroundColor: currentColor }}
              className="text-xl opacity-0.9 text-white hover:drop-shadow-xl rounded-md w-56  p-3 ml-10 "
            >
              Edit Task
            </button>
          </Link>
        )}
        <button
          style={{ backgroundColor: currentColor }}
          onClick={() => handleDelete(TaskDetails[0]._id)}
          className="text-xl opacity-0.9 text-white hover:drop-shadow-xl rounded-md w-56  p-3 ml-10 "
        >
          Delete Task
        </button>
      </div>
      <div className="mainContainer m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl mx-4">
        <div className="taskContent my-5">
          <div className="headContent flex gap-14">
            <div className="left">
              <p>
                {count[1]}/{count[0]} completed
              </p>
              <h2 className="text-3xl font-extrabold my-1">
                {TaskDetails[0] ? TaskDetails[0].title : "temp"}
              </h2>
              <p className="font-semibold">
                {TaskDetails[0] && TaskDetails[0].projectid
                  ? TaskDetails[0].projectid.title
                  : "temp"}
              </p>
            </div>
            {/* <div className="right h-20 w-24 bg-slate-400 rounded-[50%]">
              <TaskPieChart />
            </div> */}
          </div>
          <p className="my-8 text-lg mr-10">
            {TaskDetails[0] ? TaskDetails[0].description : "temp"}
          </p>
          <div className="taskOverview flex justify-between ">
            <div className="taskContainer ">
              {TaskDetails[0]
                ? TaskDetails[0].subtasks.map((item) => (
                    <div className="task flex ml-5 gap-3 items-center my-5">
                      <input
                        className="h-6 w-6 border border-gray-300 rounded-3xl checked:bg-[#22A80D] transition duration-200"
                        type="checkbox"
                        value=""
                        checked={item.isComplete}
                        onChange={() => handleCheck(item,TaskDetails[0]._id)}
                      />
                      <label className="text-xl">{item.title}</label>
                    </div>
                  ))
                : "temp"}
              {isAdmin && (
                <Link
                  to={
                    TaskDetails[0]
                      ? `/tasks/subtasks/form/${TaskDetails[0]._id}`
                      : `/tasks/subtasks/form/`
                  }
                >
                  <button
                    style={{ backgroundColor: currentColor }}
                    className="text-xl opacity-0.9 text-white hover:drop-shadow-xl rounded-md  p-3 ml-10 my-5"
                  >
                    Add SubTask
                  </button>
                </Link>
              )}
            </div>
            <div className="rightPieChart w-[70%] flex justify-center items-center border-[1px] rounded-2xl border-black mr-[0%]">
              {/* <Doughnut
                id="chart-pie"
                data={pieChartData}
                // legendVisiblity={false}
                height="full"
              /> */}
              <TaskPieChart
                className="h-10 w-10"
                data={[
                  { y: count[1], x: count[1] },
                  { y: count[2], x: count[2] },
                ]}
              />
              <div className="chartlabel flex flex-col gap-5 w-[29%]">
                <div className="label flex gap-2 justify-start items-center cursor-pointer">
                  <div className="h-[20px] w-[20px] bg-[#00BDAE] rounded-[50%] "></div>{" "}
                  Task completed
                </div>
                <div className="label flex gap-2 justify-start items-center cursor-pointer">
                  <div className="h-[20px] w-[20px] bg-[#404041] rounded-[50%]"></div>{" "}
                  Task has to be complete
                </div>
              </div>
            </div>
            {/* <div className="breakLine bg-black h-[1px] w-full my-14"></div> */}
          </div>
        </div>
        <div className="commentSection my-16">
          <h3 className="text-2xl font-semibold">Comments :</h3>
          <div className="commentContainer flex flex-col mx-4 my-5 ">
            {allComments
              ? allComments.map((item) => {
                  return (
                    <div className="comment flex justify-start items-center gap-5 bg-light-gray py-3 px-10 rounded-2xl my-3 w-full">
                      <div className="userIcon h-12 w-12 rounded-[50%] bg-black"></div>
                      <div className="comment ">
                        <p className="font-semibold">{item.addedBy.name}</p>
                        <p>{item.text}</p>
                      </div>
                    </div>
                  );
                })
              : ""}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskCard;
