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

    callback("success", data.resp, () => {});

    localStorage.setItem(
      Constants.AUTH_TOKEN,
      JSON.stringify(data.resp.data.token)
    );
    localStorage.setItem(
      Constants.USER_PROFILE,
      JSON.stringify(data.resp.data.user.name)
    );
    localStorage.setItem(
      Constants.USER_ID,
      JSON.stringify(data.resp.data.user._id)
    );

    return { remember: payload.remember, ...data.resp };
  }
);

export const LogOut = createAsyncThunk("logout", async ({ callback }) => {
  localStorage.removeItem(Constants.AUTH_TOKEN);
  localStorage.removeItem(Constants.USER_PROFILE);
  localStorage.removeItem(Constants.USER_ID);
  localStorage.removeItem("Admin");
  callback("LogOut success");
});

export const UserMe = createAsyncThunk("auth/me", async ({ callback }) => {
  const data = await MakeRequest(Api.GET, {
    type: Type.AUTH,
    url: Routes.ME,
    // body: payload,
  });
  if (data.err) {
    callback("error", data.err, () => {});
    return null;
  }
  callback("success", data.resp, () => {});
  // console.log(data.resp.data.user.isSuperUser);
  localStorage.setItem("Admin", data.resp.data.user.isSuperUser);
  return data.resp;
});

const AuthSlice = createSlice({
  name: "UserDetails",
  initialState: {
    isAamin: null,
  },
  reducers: {},
  extraReducers: {
    [UserMe.fulfilled]: (state, action) => {
      console.log(action.payload);
      if (action.payload) {
        const data = action.payload;
        console.log(data.resp.data.user);
        state.isadmin = data.resp.data.user.isSuperUser;
        // localStorage.setItem(
        //   Constants.,
        //   JSON.stringify(data.resp.data.token)
        // );
      }
    },
  },
});

// export const { setData } = PoleSlice.actions;

export default AuthSlice.reducer;
