import { combineReducers } from "redux";
import { SignUp } from "./AuthReducer";
import CommentReducer from "./CommentReducer";
import EmployeeReducer from "./EmployeeReducer";
import ProjectReducer from "./ProjectReducer";
import SubTaskReducer from "./SubTaskReducer";
import TaskReducer from "./TaskReducer";

export default combineReducers({
  // SignUp: SignUp,
  Projects: ProjectReducer,
  AllTasks: TaskReducer,
  SubTask: SubTaskReducer,
  EmployeesList: EmployeeReducer,
  Comments: CommentReducer,
});
