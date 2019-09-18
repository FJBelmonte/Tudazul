import {
  FETCH_PATIENTS,
  FETCH_PATIENT,
  CREATE_PATIENT_SUCESS,
  CREATE_PATIENT_FAIL
} from "../actions/types";

const INITIAL_STATE = {
  patients: {}
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FETCH_PATIENTS:
      return { ...state, patients: { ...action.payload } };
    default:
      return state;
  }
};
