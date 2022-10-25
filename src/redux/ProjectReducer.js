import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Constants, Routes, Api, Type } from "../utils/Constants";
import { MakeRequest } from "../utils/ApiManager";

export const FetchAllProject = createAsyncThunk(
  "dashboard/projects",
  async ({}) => {
    const data = await MakeRequest(Api.GET, {
      url: Routes.GET_PROJECTS,
      type: Type.DASH,
      query: { text: "" },
    });
    if (data.err) {
      // callback("error", data.err, () => {});
      return null;
    }
    // callback("success", data.resp, () => {});
    // console.log(data);
    return data.resp.data;
  }
);

export const AddProject = createAsyncThunk(
  "project",
  async ({ payload, callback }) => {
    const data = await MakeRequest(Api.POST, {
      type: Type.DASH,
      url: Routes.CREATE_PROJECT,
      body: payload,
    });

    if (data.err) {
      callback("error", data.err, () => {});
      return null;
    }
    callback("success", data.resp, () => {});
    return { ...data.resp.data, ...payload };
  }
);

const ProjectSlice = createSlice({
  name: "projects",
  initialState: {
    projects: [],
    // analytics: {},
  },
  reducers: {
    // setData(state, action) {
    //   const { user, token } = action.payload;
    //   if (user) {
    //     state.user = user;
    //     localStorage.setItem(Constants.UserProfile, JSON.stringify(user));
    //   }
    //   if (token) {
    //     state.token = token;
    //     localStorage.setItem(Constants.AuthToken, token);
    //   }
    // },
  },
  extraReducers: {
    [FetchAllProject.fulfilled]: (state, action) => {
      // console.log(action.payload);
      if (action.payload) {
        const data = action.payload;
        state.projects = data;
      }
    },
  },
});

// export const { setData } = PoleSlice.actions;

export default ProjectSlice.reducer;
