import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Constants, Routes, Api, Type } from "../utils/Constants";
import { MakeRequest } from "../utils/ApiManager";

export const LeaderBoard = createAsyncThunk(
  "dashboard/leadrboard",
  async ({ callback }) => {
    const data = await MakeRequest(Api.GET, {
      type: Type.DASH,
      url: Routes.GET_LEADERBOARD,
      // body: payload,
    });
    if (data.err) {
      callback("error", data.err, () => {});
      return null;
    }
    callback("success", data.resp, () => {});
    // console.log(data.resp.data.user.isSuperUser);
    // localStorage.setItem("Admin", data.resp.data.user.isSuperUser);
    return data.resp;
  }
);

const EmployeesSlice = createSlice({
  name: "Employees",
  initialState: {
    list: "",
  },
  reducers: {},
  extraReducers: {
    [LeaderBoard.fulfilled]: (state, action) => {
      if (action.payload) {
        const data = action.payload;
        state.list = data.data;
      }
    },
  },
});

export default EmployeesSlice.reducer;
