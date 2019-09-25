import {
  FETCH_PATIENTS,
  FETCH_PATIENT,
  CREATE_PATIENT_SUCESS,
  CREATE_PATIENT_FAIL
} from "../actions/types";
import _ from "lodash";

const INITIAL_STATE = {
  patients: {},
  createdPatient: null
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FETCH_PATIENTS:
      return { ...state, patients: { ...action.payload } };
    case CREATE_PATIENT_SUCESS:
      return { ...state };
    default:
      return state;
  }
};
