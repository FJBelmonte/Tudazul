import {CREATE_CONSULT_FAIL, CREATE_CONSULT_SUCCESS} from '../actions/types';

import _ from 'lodash';

const INITIAL_STATE = {
  consults: {},
  createdAt: null,
  err: null,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case CREATE_CONSULT_SUCCESS:
      return {...state, createdAt: action.payload.createdAt, err: null};
    case CREATE_CONSULT_FAIL:
      return {...state, err: action.payload.err};
    default:
      return state;
  }
};
