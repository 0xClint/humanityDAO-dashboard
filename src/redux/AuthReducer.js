import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Constants, Routes, Api, Type } from "../utils/Constants";
import { MakeRequest } from "../utils/ApiManager";

export const SignUp = createAsyncThunk(
  "auth/signup",
  async ({ payload, callback }) => {
    const data = await MakeRequest(Api.POST, {
      type: Type.AUTH,
      url: Routes.SIGNUP,
      body: payload,
    });
    if (data.err) {
      callback("error", data.err, () => {});
      return null;
    }
    callback("success", data.resp, () => {});
    console.log(data);
    return data.resp;
  }
);

export const Login = createAsyncThunk(
  "auth/login",
  async ({ payload, callback }) => {
    const data = await MakeRequest(Api.POST, {
      type: Type.AUTH,
      url: Routes.LOGIN,
      body: payload,
    });

    if (data.err) {
      callback("error", data.err, () => {});
      return null;
    }

    callback("success", data.resp, () => {});

    localStorage.removeItem(Constants.USER_PROFILE);
    localStorage.setItem(
      Constants.USER_PROFILE,
      JSON.stringify(data.resp.data.user.name)
    );

    // localStorage.setItem(
    //   Constants.USER_ID,
    //   JSON.stringify(data.resp.data.user._id)
    // );
    localStorage.removeItem(Constants.AUTH_TOKEN);
    localStorage.setItem(
      Constants.AUTH_TOKEN,
      JSON.stringify(data.resp.data.token)
    );

    return { remember: payload.remember, ...data.resp };
  }
);
