import { combineReducers } from "redux";
import { SignUp } from "./AuthReducer";
import ProjectReducer from "./ProjectReducer";
import SubTaskReducer from "./SubTaskReducer";
import TaskReducer from "./TaskReducer";

export default combineReducers({
  SignUp: SignUp,
  Projects: ProjectReducer,
  AllTasks: TaskReducer,
  SubTask: SubTaskReducer,
});
