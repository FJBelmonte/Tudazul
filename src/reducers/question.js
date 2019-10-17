import {
  CREATE_QUESTION_ALL_FAIL,
  CREATE_QUESTION_ALL_SUCCESS,
  CREATE_QUESTION_ONE_FAIL,
  CREATE_QUESTION_ONE_SUCCESS,
} from '../actions/types';

import _ from 'lodash';

const INITIAL_STATE = {
  lastCreated: null,
  err: null,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case CREATE_QUESTION_ALL_SUCCESS:
    case CREATE_QUESTION_ONE_SUCCESS:
      return {...state, lastCreated: action.payload.lastCreated};
    case CREATE_QUESTION_ALL_FAIL:
    case CREATE_QUESTION_ONE_FAIL:
      return {...state, err: action.payload.err};
    default:
      return state;
  }
};
