import {
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  CREATE_USER_SUCCESS,
  CREATE_USER_FAIL,
  RESET_PASSWORD_SUCCESS,
  RESET_PASSWORD_FAIL
} from "../actions/types";

const INITIAL_STATE = {
  authError: {
    signIn: { code: null },
    signUp: { code: null },
    forgotPassword: { code: null }
  },
  userCreated: false,
  isLoggedIn: false,
  resetedPassword: false
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return {
        ...state,
        authError: {
          signIn: { code: null },
          signUp: { code: null },
          forgotPassword: { code: null }
        },
        user: action.payload.user,
        isLoggedIn: true,
        userCreated: false,
        resetedPassword: false
      };
    case LOGIN_FAIL:
      return {
        ...state,
        authError: { ...state.authError, signIn: { ...action.payload.err } }
      };
    case CREATE_USER_SUCCESS:
      return {
        ...state,
        authError: {
          signIn: { code: null },
          signUp: { code: null },
          forgotPassword: { code: null }
        },
        user: action.payload.user, //usado atualmente somente na home após o processo de autenticação
        userCreated: true
      };
    case CREATE_USER_FAIL:
      return {
        ...state,
        authError: { ...state.authError, signUp: { ...action.payload.err } }
      };
    case RESET_PASSWORD_SUCCESS:
      return {
        ...state,
        authError: {
          signIn: { code: null },
          signUp: { code: null },
          forgotPassword: { code: null }
        },
        resetedPassword: true
      };
    case RESET_PASSWORD_FAIL:
      return {
        ...state,
        authError: {
          ...state.authError,
          authError: {
            ...state.authError,
            forgotPassword: { ...action.payload.err }
          }
        }
      };
    default:
      return state;
  }
};
