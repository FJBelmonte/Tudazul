import {CREATE_CONSULT_FAIL, CREATE_CONSULT_SUCCESS} from '../actions/types';

import _ from 'lodash';

const INITIAL_STATE = {
  consults: {},
  createdConsult: null,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case CREATE_CONSULT_SUCCESS:
      return {...state};
    default:
      return state;
  }
};
