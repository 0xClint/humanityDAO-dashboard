import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Constants, Routes, Api, Type } from "../utils/Constants";
import { MakeRequest } from "../utils/ApiManager";

export const FetchAllTask = createAsyncThunk(
  "dashboard/tasks/all",
  async ({}) => {
    const data = await MakeRequest(Api.GET, {
      type: Type.DASH,
      url: Routes.GET_TASKS,
      query: { text: "" },
    });
    if (data.err) {
      return null;
    }
    // console.log(data);
    return data.resp.data;
  }
);

export const AddTask = createAsyncThunk(
  "project/",
  async ({ payload, callback, query }) => {
    const data = await MakeRequest(Api.POST, {
      type: Type.DASH,
      url: Routes.ADD_TASK.replace(":projectid", query),
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

const TaskSlice = createSlice({
  name: "AllTasks",
  initialState: {
    tasks: [],
    // Atask: null,
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
    [FetchAllTask.fulfilled]: (state, action) => {
      // console.log(action.payload);
      if (action.payload) {
        const data = action.payload;
        state.tasks = data;
      }
    },
    // [FetchTask.fulfilled]: (state, action) => {
    //   // console.log(action.payload);
    //   if (action.payload) {
    //     const data = action.payload;
    //     state.Atask = data;
    //   }
    // },
  },
});

// export const { setData } = PoleSlice.actions;

export default TaskSlice.reducer;
