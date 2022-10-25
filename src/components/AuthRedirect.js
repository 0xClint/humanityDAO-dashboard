import { useNavigate } from "react-router-dom";
import { Constants } from "../utils/Constants";

export const AuthRedirect = () => {
  const navigate = useNavigate();
  if (!localStorage.getItem(Constants.AUTH_TOKEN)) {
    console.log(localStorage.getItem(Constants.AUTH_TOKEN), "add");
    navigate("/login");
  }
};
