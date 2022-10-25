import React, { useState } from "react";
import { useStateContext } from "../contexts/ContextProvider";
import { useDispatch } from "react-redux";
import { Login } from "../redux/AuthReducer";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const { setIsSidebar, setIsNavbar, setActiveMenu } = useStateContext();
  const [email, setEmail] = useState("");
  const [alert, setAlert] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigation = useNavigate();

  setIsSidebar(false);
  setIsNavbar(false);
  setActiveMenu(false);

  const handleClick = async () => {
    const values = {
      email,
      password,
    };
    dispatch(
      await Login({
        payload: values,
        callback: async (msg, data, recall) => {
          console.log(msg, recall, data.data);
          if (msg === "error") {
            setAlert(data);
          } else {
            console.log(data);
            recall();
            setIsSidebar(true);
            setIsNavbar(true);
            setActiveMenu(true);
            navigation(`/overview/`);
            window.location.reload();
          }
        },
      })
    );
  };

  return (
    <div className="login h-full w-full overflow-hidden bg-[#F9FAFB] flex flex-col items-center justify-center">
      <div className="heading text-[2.3rem] font-bold">
        Humanity
        <span id="bold" className="text-[#5033ff]">
          DAO
        </span>
      </div>
      <p className="text-[2.5rem] font-extrabold mb-12 mt-2">
        Sign in to your Account
      </p>
      <div className="loginCointainer bg-white w-[500px] rounded-md shadow-md px-14 py-12 flex flex-col items-center gap-8">
        <div className="question flex flex-col gap-2 w-full">
          <label htmlFor="" className="font-semibold text-[#414141]">
            Email address
          </label>
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="px-3 py-1.5 font-normal  text-gray-700 bg-white bg-clip-padding border  border-solid border-gray-300 rounded transition"
          />
        </div>
        <div className="question flex flex-col gap-2 w-full">
          <label htmlFor="" className="font-semibold text-[#414141]">
            Password
          </label>
          <input
            type="text"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="px-3 py-1.5 font-normal  text-gray-700 bg-white bg-clip-padding mb-2 border border-solid border-gray-300 rounded transition"
          />
        </div>
        <div className="min:h-6 text-red-700">{alert ? alert : ""}</div>
        {/* <Link to={`/overview`}> */}
        <button
          className="text-xl opacity-0.9 bg-[#5033ff] text-white hover:drop-shadow-xl rounded-md w-full p-3"
          onClick={() => handleClick()}
        >
          Sign in
        </button>
        {/* </Link> */}
      </div>
    </div>
  );
};

export default LoginPage;
