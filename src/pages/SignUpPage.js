import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Web3 from "web3";
import { useDispatch } from "react-redux";
import { useStateContext } from "../contexts/ContextProvider";
import { SignUp } from "../redux/AuthReducer";

const SignUpPage = () => {
  const { setIsSidebar, setIsNavbar, setActiveMenu } = useStateContext();
  const [isConnected, setIsConnected] = useState(false);
  const [address, setAddress] = useState("");
  const [alert, setAlert] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigation = useNavigate();

  const dispatch = useDispatch();

  setIsSidebar(false);
  setIsNavbar(false);
  setActiveMenu(false);

  const detectCurrentProvider = () => {
    let provider;

    if (window.ethereum) {
      provider = window.ethereum;
    } else if (window.web3) {
      provider = window.web3.currentProvider;
    } else {
      console.log("No wallet Detected, Please install MetaMask !!!");
    }
    return provider;
  };

  const onConnect = async (e) => {
    setIsConnected(!isConnected);
    try {
      const currentProvider = detectCurrentProvider();

      if (currentProvider) {
        await currentProvider.request({ method: "eth_requestAccounts" });
        const web3 = new Web3(currentProvider);
        const userAccount = await web3.eth.getAccounts();
        const account = userAccount[0];
        let ethBalance = await web3.eth.getBalance(account);

        await setAddress(account);
        // await setBalance(ethBalance);
        await setIsConnected(true);
        console.log(address);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = () => {
    // console.log("signing Up");
    const values = {
      email,
      name,
      address,
      password,
      // email: "o@gmail.com",
      // password: "Password@123",
      // address: "1234",
      // name: "Omkasd",
    };

    dispatch(
      SignUp({
        payload: values,
        callback: (msg, data, recall) => {
          if (msg === "error") {
            setAlert(data);
          } else {
            console.log(data);
            navigation(`/login`);
            // window.location.reload();
            recall();
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
        Sign Up to your Account
      </p>
      <div className="loginCointainer bg-white w-[500px] rounded-md shadow-md px-14 py-12 flex flex-col items-center gap-8">
        <div className="question flex flex-col gap-2 w-full">
          <label htmlFor="" className="font-semibold text-[#414141]">
            Name
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="px-3 py-1.5 font-normal  text-gray-700 bg-white bg-clip-padding border  border-solid border-gray-300 rounded transition"
          />
        </div>
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
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="px-3 py-1.5 font-normal  text-gray-700 bg-white bg-clip-padding mb-2 border border-solid border-gray-300 rounded transition"
          />
        </div>
        <button
          className="text-xl bg-[#836FFF] text-white hover:drop-shadow-xl rounded-md w-full p-3"
          onClick={onConnect}
        >
          Connect Wallet
        </button>
        <div className="min:h-6 text-red-700">{alert ? alert : ""}</div>
        <button
          className="text-xl opacity-0.9 bg-[#5033ff] text-white hover:drop-shadow-xl rounded-md w-full p-3"
          onClick={handleSubmit}
        >
          Sign Up
        </button>
      </div>
    </div>
  );
};

export default SignUpPage;
