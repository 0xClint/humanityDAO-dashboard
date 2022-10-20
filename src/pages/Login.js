import React, { useState } from "react";
import Web3 from "web3";

const Login = () => {
  const [isConnected, setIsConnected] = useState(false);
  const [address, setAddress] = useState("");
  const [balance, setBalance] = useState("");

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
        await setBalance(ethBalance);
        await setIsConnected(true);
        console.log(address, balance);
      }
    } catch (error) {
      console.log(error);
    }
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
            className="px-3 py-1.5 font-normal  text-gray-700 bg-white bg-clip-padding border  border-solid border-gray-300 rounded transition"
          />
        </div>
        <div className="question flex flex-col gap-2 w-full">
          <label htmlFor="" className="font-semibold text-[#414141]">
            Password
          </label>
          <input
            type="text"
            className="px-3 py-1.5 font-normal  text-gray-700 bg-white bg-clip-padding mb-2 border border-solid border-gray-300 rounded transition"
          />
        </div>
        <button
          className="text-xl bg-[#836FFF] text-white hover:drop-shadow-xl rounded-md w-full p-3"
          onClick={onConnect}
        >
          Connect Wallet
        </button>
        <button className="text-xl opacity-0.9 bg-[#5033ff] text-white hover:drop-shadow-xl rounded-md w-full p-3">
          Sign in
        </button>
      </div>
    </div>
  );
};

export default Login;
