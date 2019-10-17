import {
  CREATE_PATIENT_FAIL,
  CREATE_PATIENT_SUCESS,
  FETCH_PATIENT,
  FETCH_PATIENTS,
} from '../actions/types';

import _ from 'lodash';

const INITIAL_STATE = {
  patients: {},
  createdAt: null,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FETCH_PATIENTS:
      return {...state, patients: {...action.payload}};
    case CREATE_PATIENT_SUCESS:
      return {...state, createdAt: action.payload.createdAt};
    default:
      return state;
  }
};
