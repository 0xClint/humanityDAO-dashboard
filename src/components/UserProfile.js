import React, { useEffect, useState } from "react";
import { MdOutlineCancel } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import { Button } from ".";
import { useDispatch, useSelector } from "react-redux";
import { useStateContext } from "../contexts/ContextProvider";
import { Constants } from "../utils/Constants";
import { LogOut } from "../redux/AuthReducer";

const UserProfile = () => {
  const { currentColor, isAdmin } = useStateContext();
  const [user, setUser] = useState();
  const dispatch = useDispatch();
  const navigation = useNavigate();

  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem(Constants.USER_PROFILE)));
    // console.log(isAdmin, "hii");
  });

  const handleLogout = async () => {
    console.log("logout button");
    await dispatch(
      LogOut({
        callback: async (msg) => console.log(msg),
      })
    );
    navigation(`/login`);
  };

  return (
    <div className="nav-item absolute right-1 top-16 bg-white dark:bg-[#42464D] p-8 rounded-lg w-96">
      <div className="flex justify-between items-center">
        <p className="font-semibold text-lg dark:text-gray-200">User Profile</p>
        <Button
          icon={<MdOutlineCancel />}
          color="rgb(153, 171, 180)"
          bgHoverColor="light-gray"
          size="2xl"
          borderRadius="50%"
        />
      </div>
      <div className="flex gap-5 items-center mt-6 border-color border-b-1 pb-6">
        <div>
          <p className="font-semibold text-xl dark:text-gray-200"> {user} </p>
          <p className="text-gray-500 text-sm dark:text-gray-400 ">
            Admin : {isAdmin ? "true" : "false"}
          </p>
        </div>
      </div>
      <div>
        <div className="flex flex-col gap-5 border-b-1 border-color p-4 hover:bg-light-gray cursor-pointer  dark:hover:bg-[#42464D]">
          <Link to={`/projects`}>
            <p className="font-semibold dark:text-gray-200 ">Projects</p>
            <p className="text-gray-500 text-sm dark:text-gray-400">
              View all projects
            </p>
          </Link>
        </div>
        <div className="flex flex-col gap-5 border-b-1 border-color p-4 hover:bg-light-gray cursor-pointer  dark:hover:bg-[#42464D]">
          <Link to={`/tasks`}>
            <p className="font-semibold dark:text-gray-200 ">Tasks</p>
            <p className="text-gray-500 text-sm dark:text-gray-400">
              View all tasks
            </p>
          </Link>
        </div>
        <div className="flex flex-col gap-5 border-b-1 border-color p-4 hover:bg-light-gray cursor-pointer  dark:hover:bg-[#42464D]">
          <Link to={`/employees`}>
            <p className="font-semibold dark:text-gray-200 ">Employees</p>
            <p className="text-gray-500 text-sm dark:text-gray-400">
              view all Members
            </p>
          </Link>
        </div>
      </div>
      <div className="mt-5">
        {/* <Link to="/login"> */}
        <button
          onClick={() => handleLogout()}
          style={{ backgroundColor: currentColor }}
          className="text-xl opacity-0.9 text-white hover:drop-shadow-xl rounded-md  p-3"
        >
          Logout
        </button>
        {/* </Link> */}
      </div>
    </div>
  );
};

export default UserProfile;
