import {
  FETCH_PATIENT_DIARY,
  FETCH_PATIENT_PATIENT,
  FETCH_PATIENT_PSYCHOLGIST,
  FETCH_PATIENT_TUDAZUL,
  LOGIN_PATIENT_FAIL,
  LOGIN_PATIENT_SUCCESS,
  SET_PATIENT_LAST_ACCESS,
} from '../../actions/types';

const INITIAL_STATE = {
  ref: null,
  lastCreated: null,
  user: null,
  psychologist: '',
  diary: null,
  tudazul: null,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FETCH_PATIENT_PATIENT:
      return {...state, user: action.payload.patient};
    case LOGIN_PATIENT_SUCCESS:
      return {...state, ref: action.payload.ref};
    case FETCH_PATIENT_PSYCHOLGIST:
      return {...state, psychologist: action.payload};
    case FETCH_PATIENT_DIARY:
      return {...state, diary: action.payload};
    case FETCH_PATIENT_TUDAZUL:
      return {
        ...state,
        tudazul: {
          global: {...action.payload.global},
          patient: {...action.payload.patient},
        },
      };
    default:
      return state;
  }
};
