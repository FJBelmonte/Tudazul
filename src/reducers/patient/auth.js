import {
  FETCH_DIARY,
  FETCH_PATIENT_PATIENT,
  FETCH_PATIENT_PSYCHOLGIST,
  LOGIN_PATIENT_FAIL,
  LOGIN_PATIENT_SUCCESS,
} from '../../actions/types';

const INITIAL_STATE = {
  ref: null,
  lastCreated: null,
  user: null,
  psychologist: '',
  diary: null,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FETCH_PATIENT_PATIENT:
      return {...state, user: action.payload.patient};
    case LOGIN_PATIENT_SUCCESS:
      return {...state, ref: action.payload.ref};
    case FETCH_PATIENT_PSYCHOLGIST:
      return {...state, psychologist: action.payload};
    case FETCH_DIARY:
      return {...state, diary: action.payload};
    default:
      return state;
  }
};
