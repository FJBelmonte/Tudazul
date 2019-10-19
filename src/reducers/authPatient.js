import {LOGIN_PATIENT_FAIL, LOGIN_PATIENT_SUCCESS} from '../actions/types';

import _ from 'lodash';

const INITIAL_STATE = {
  ref: {},
  lastCreated: null,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case LOGIN_PATIENT_SUCCESS:
      return {...state, ref: action.payload.ref};
    default:
      return state;
  }
};
