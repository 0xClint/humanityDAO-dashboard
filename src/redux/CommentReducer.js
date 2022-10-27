import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Constants, Routes, Api, Type } from "../utils/Constants";
import { MakeRequest } from "../utils/ApiManager";

export const GetCommentTask = createAsyncThunk(
  "dashboard/task/{taskid}/comments",
  async ({ query, callback }) => {
    const data = await MakeRequest(Api.GET, {
      url: Routes.GET_TASK_COMMENTS.replace(":taskid", query),
      type: Type.DASH,
      query: { text: "" },
    });
    if (data.err) {
      callback("error", data.err, () => {});
      return null;
    }
    callback("success", data.resp, () => {});
    // console.log(data);
    return data.resp.data;
  }
);

export const AddCommentTask = createAsyncThunk(
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

const CommentSlice = createSlice({
  name: "AllComments",
  initialState: {
    comments: [],
    // project: null,
  },
  reducers: {},
  extraReducers: {
    [GetCommentTask.fulfilled]: (state, action) => {
      // console.log(action.payload);
      if (action.payload) {
        const data = action.payload;
        state.comments = data;
      }
    },
  },
});

export default CommentSlice.reducer;
