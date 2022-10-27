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

export const FetchProject = createAsyncThunk(
  "dashboard/projects/",
  async ({ query, callback }) => {
    const data = await MakeRequest(Api.GET, {
      url: Routes.GET_PROJECT.replace(":projectid", query),
      type: Type.DASH,
    });
    if (data.err) {
      // callback("error", data.err, () => {});
      return null;
    }
    callback("success", data.resp, () => {});
    // console.log(data);
    return data.resp.data;
  }
);

export const AddProject = createAsyncThunk(
  "project/add",
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

export const EditProject = createAsyncThunk(
  "project/edit",
  async ({ payload, callback, query }) => {
    const data = await MakeRequest(Api.PUT, {
      type: Type.DASH,
      url: Routes.EDIT_PROJECT,
      body: payload,
      query: query,
    });
    console.log(data);

    if (data.err) {
      callback("error", data.err, () => {});
      return null;
    }
    callback("success", data.resp, () => {});
    return { ...data.resp.data, ...payload };
  }
);
export const DeleteProject = createAsyncThunk(
  "project/edit",
  async ({ payload, callback, query }) => {
    const data = await MakeRequest(Api.DELETE, {
      type: Type.DASH,
      url: Routes.DELETE_PROJECT.replace(":projectid", query),
      body: payload,
    });
    console.log(data);

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
    project: null,
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
    // [EditProject.fulfilled]: (state, action) => {
    //   console.log(action.payload);
    //   // if (action.payload) {
    //   //   const data = action.payload;
    //   //   state.projects = data;
    //   // }
    // },
    [FetchProject.fulfilled]: (state, action) => {
      console.log(action.payload);
      if (action.payload) {
        const data = action.payload;
        state.project = data;
        localStorage.setItem("EDIT PROJECT TITLE", JSON.stringify(data.title));
      }
    },
  },
});

// export const { setData } = PoleSlice.actions;

export default ProjectSlice.reducer;
