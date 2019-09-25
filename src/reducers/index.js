import { combineReducers } from "redux";

import auth from "./auth";
import psychologistPatient from "./patient";

export default combineReducers({
  auth,
  psychologistPatient
});
