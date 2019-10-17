import {
  CREATE_PATIENT_FAIL,
  CREATE_PATIENT_SUCCESS,
  FETCH_PATIENT,
  FETCH_PATIENTS,
} from '../actions/types';

import _ from 'lodash';

const INITIAL_STATE = {
  patients: {},
  lastCreated: null,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FETCH_PATIENTS:
      return {...state, patients: {...action.payload}};
    case CREATE_PATIENT_SUCCESS:
      return {...state, lastCreated: action.payload.lastCreated};
    default:
      return state;
  }
};
