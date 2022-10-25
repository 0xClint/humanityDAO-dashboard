const Constants = {
  AUTH_TOKEN: "AuthToken",
  USER_PROFILE: "UserProfile",
  USER_ID: "UserId",
  INVALID_EMAIL: "Please enter a valid email",
  INVALID_REQUEST: "Invalid Request",
  RESET_PASSWORD: "RESET_PASSWORD",
  TFA_LOGIN: "TFA_LOGIN",
  PASSWORD_MISSING: "Please enter the password",
  PASSWORD_NOT_MATCHING: "Confirm password and new password should match",
  WRONG_PASSWORD: "Your password is wrong",
  NOUSER: "No user found",

  TRY_AFTER_SOMETIME: "Please try again after sometime",
  EMAIL_BLANK: "sender's mail is blank",
  DEFAULT_MAIL_SUBJECT: "Message from humanity dao",
  PASSWORD_WEAK:
    "Password must have length 6-20 and should be the combination of atleast one special character,one small letter, one capital letter and one digit",
  FIELDS_MISSING: "Please fill all fields:${fields}",
  USER_EXISTS_WITH_THIS_EMAIL:
    "Someone is already using this email.Please try a different email",
  WRONG_OTP: "OTP is wrong",
  SOMETHING_BAD: "Something bad happened",
  INVALID_FILE: "You are uploading an invalid file.Only ${file} are allowed",
  PROFILE_BUCKET: "humanity-dao",

  DEFAULT_DP:
    "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg",
  DEFAULT_PLACE_IMAGE:
    "https://media.istockphoto.com/vectors/city-urban-streets-roads-abstract-map-vector-id1137117479?k=20&m=1137117479&s=612x612&w=0&h=56n_1vX4IdhkyNZ0Xj6NfSPA0jZSwf6Ru2K68udk4H4=",
  OTP_EXPIRES_AFTER_SECONDS: 3600,
  OTP_LENGTH: 6,
  MAX_OTP_ATTEMPT: 5,
  LARGE_FILE: "Your file is very large.File size must not exceed ${size}",
  ACCESS_DENIED: "You do not have permission to access this resource",
  ACTION_DENIED: "You do not have permission to perform this operation",
  NOT_FOUND: "This page is not found",
  BAD_DATA: "Invalid Input",
  PASSWORD_REGEX:
    /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{6,20}$/,
  EMAIL_REGEX:
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
};

const Routes = {
  LOGIN: "/login",
  SIGNUP: "/signup",
  ME: "/me",
  GET_PROJECTS: "/projects",
  GET_PROJECT: "/project/:projectid",
  CREATE_PROJECT: "/project",
  EDIT_PROJECT: "/project/:projectid",
  DELETE_PROJECT: "/project/:projectid",
  TASKS_STATS: "/statistics",
  TODAYS_TASK: "/tasks/today",
  GET_TASKS: "/tasks/all",
  ADD_TASK: "/project/:projectid/task",
  DELETE_TASK: "/task/:taskid",
  EDIT_TASK: "/task/:taskid",
  GET_A_TASK: "/task/:taskid",
  GET_TASK_COMMENTS: "/task/:taskid/comments",
  GET_A_SUBTASK: "/subtask/:subtaskid",
  ADD_SUBTASK: "/subtask/:taskid",
  DELETE_SUBTASK: "/subtask/:subtaskid",
  EDIT_SUBTASK: "/subtask/:subtaskid",
  GET_SUBTASK_COMMENTS: "/subtask/:subtaskid/comments",
  ADD_COMMENT: "/addcomment", // pass taskid or subtaskid as query
  DELETE_COMMENT: "/comment/:commentid",
  GET_LEADERBOARD: "/leaderboard",
  GET_NOTIFICATION: "/notifications",
};

const Api = {
  GET: "GET",
  POST: "POST",
  PUT: "PUT",
  PATCH: "PATCH",
  DELETE: "DELETE",
};

const Type = {
  AUTH: "/auth",
  DASH: "/dashboard",
};

module.exports = {
  Constants,
  Routes,
  Type,
  Api,
};
