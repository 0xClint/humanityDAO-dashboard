import axios from "axios";
import { Constants } from "./Constants";

// const AUTH_API_ENDPOINT = "https://humanitydao-backend.herokuapp.com/auth";
const API_ENDPOINT = "https://humanitydao-backend.herokuapp.com";

export const MakeRequest = async (method, data) => {
  // export const MakeRequest = async (method, data, callback) => {
  const { url, type, body, query, file } = data;
  let token = localStorage.getItem(Constants.AUTH_TOKEN);
  const headers = { "Content-Type": "application/json" };
  if (token) {
    token = JSON.parse(token);
    headers.Authorization = `Bearer ${token}`;
  }
  let resp;
  let form;

  switch (method) {
    case "POST":
      try {
        resp = await axios({
          method,
          url: `${API_ENDPOINT}${type}${url}`,
          data: JSON.stringify(body),
          headers: {
            ...headers,
          },
        });
        if (resp && resp.data && resp.data.error) {
          if (resp.data.error.logout) {
            // localStorage.clear();
            // window.location.replace("/");
          } else {
            return { err: resp.data.error, resp: null };
          }
        }
        return { err: null, resp: resp.data };
      } catch (e) {
        return { err: e, resp: null };
      }

    case "GET":
      try {
        resp = await axios({
          method,
          url: `${API_ENDPOINT}${type}${url}`,
          params: query || {},
          headers: {
            ...headers,
          },
        });
        if (resp && resp.data && resp.data.error) {
          if (resp.data.error.logout) {
            // localStorage.clear();
            // window.location.replace("/");
          } else {
            return { err: resp.data.error, resp: null };
          }
        }
        return { err: null, resp: resp.data };
      } catch (e) {
        return { err: e, resp: null };
      }

    case "PUT":
    case "DELETE":
    case "PATCH":
      try {
        resp = await axios({
          method,
          url: `${API_ENDPOINT}${type}${url}`,
          params: query || {},
          data: JSON.stringify(body),
          headers: {
            ...headers,
          },
        });
        if (resp && resp.data && resp.data.error) {
          if (resp.data.error.logout) {
            // localStorage.clear();
            window.location.replace("/");
          } else {
            return { err: resp.data.error, resp: null };
          }
        }
        return { err: null, resp: resp.data };
      } catch (e) {
        return { err: e, resp: null };
      }

    default:
      break;
  }
};
