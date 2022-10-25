import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Constants, Routes, Api, Type } from "../utils/Constants";
import { MakeRequest } from "../utils/ApiManager";

export const FetchSubTask = createAsyncThunk(
  "dashboard/subtask/",
  async ({ query }) => {
    const data = await MakeRequest(Api.GET, {
      type: Type.DASH,
      url: Routes.GET_A_SUBTASK.replace(":subtaskid", query),
    });
    console.log(data);
    return data.resp.data;
  }
);

export const AddSubTask = createAsyncThunk(
  "dashboard/subtask/:taskid",
  async ({ payload, callback, query }) => {
    const data = await MakeRequest(Api.POST, {
      type: Type.DASH,
      url: Routes.ADD_SUBTASK.replace(":taskid", query),
      body: payload,
    });

    if (data.err) {
      callback("error", data.err, () => {});
      return null;
    }
    console.log(data);
    callback("success", data.resp, () => {});
    return { ...data.resp.data, ...payload };
  }
);

export const EditSubTask = createAsyncThunk(
  "dashboard/subtask/:subtaskid",
  async ({ payload, callback, query }) => {
    const data = await MakeRequest(Api.PUT, {
      type: Type.DASH,
      url: Routes.EDIT_SUBTASK.replace(":subtaskid", query),
      body: payload,
    });

    if (data.err) {
      callback("error", data.err, () => {});
      return null;
    }
    console.log(data);
    callback("success", data.resp, () => {});
    return { ...data.resp.data, ...payload };
  }
);

const SubTaskSlice = createSlice({
  name: "SubTasks",
  initialState: {
    subTasks: [],
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
    [FetchSubTask.fulfilled]: (state, action) => {
      // console.log(action.payload);
      if (action.payload) {
        const data = action.payload;
        state.subtask = data;
      }
    },
  },
});

// export const { setData } = PoleSlice.actions;

export default SubTaskSlice.reducer;
