import { combineReducers } from "redux";

import auth from "./auth";
import psicologoPatient from "./patient";

export default combineReducers({
  auth,
  psicologoPatient
});
