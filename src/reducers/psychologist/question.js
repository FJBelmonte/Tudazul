import {
  CREATE_QUESTION_ALL_FAIL,
  CREATE_QUESTION_ALL_SUCCESS,
  CREATE_QUESTION_ONE_FAIL,
  CREATE_QUESTION_ONE_SUCCESS,
  FETCH_QUESTION,
} from '../../actions/types';

import _ from 'lodash';

const INITIAL_STATE = {
  lastCreated: null,
  err: null,
  question: {},
  phrase: {},
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case CREATE_QUESTION_ALL_SUCCESS:
    case CREATE_QUESTION_ONE_SUCCESS:
      return {...state, lastCreated: action.payload.lastCreated};
    case CREATE_QUESTION_ALL_FAIL:
    case CREATE_QUESTION_ONE_FAIL:
      return {...state, err: action.payload.err};
    case FETCH_QUESTION:
      return {
        ...state,
        question: action.payload.question,
        phrase: action.payload.phrase,
      };
    default:
      return state;
  }
};
