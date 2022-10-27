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
export const FetchTask = createAsyncThunk(
  "dashboard/tasks/all",
  async ({ query, callback }) => {
    const data = await MakeRequest(Api.GET, {
      type: Type.DASH,
      url: Routes.GET_A_TASK.replace(":taskid", query),
    });
    if (data.err) {
      return null;
    }
    // let taskdetail ={
    //   title:
    // }
    // console.log(data.resp.data.title, data.resp.data.description);
    callback("success", data.resp, () => {});
    // localStorage.setItem("EDIT TASK TITLE", data.resp.data);
    localStorage.setItem("EDIT TASK TITLE", JSON.stringify(data.resp.data));
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
export const EditTask = createAsyncThunk(
  "project/",
  async ({ payload, callback, query }) => {
    console.log(query);
    const data = await MakeRequest(Api.PUT, {
      type: Type.DASH,
      url: Routes.EDIT_TASK.replace(":taskid", query),
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

export const DeleteTask = createAsyncThunk(
  "project/edit",
  async ({ payload, callback, query }) => {
    const data = await MakeRequest(Api.DELETE, {
      type: Type.DASH,
      url: Routes.DELETE_TASK.replace(":taskid", query),
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

const TaskSlice = createSlice({
  name: "AllTasks",
  initialState: {
    tasks: [],
  },
  reducers: {},
  extraReducers: {
    [FetchAllTask.fulfilled]: (state, action) => {
      // console.log(action.payload);
      if (action.payload) {
        const data = action.payload;
        state.tasks = data;
      }
    },
  },
});

export default TaskSlice.reducer;
