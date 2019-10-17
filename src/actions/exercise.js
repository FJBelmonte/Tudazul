import {
  CREATE_EXERCISE_ALL_FAIL,
  CREATE_EXERCISE_ALL_SUCCESS,
  CREATE_EXERCISE_ONE_FAIL,
  CREATE_EXERCISE_ONE_SUCCESS,
} from './types';

import firebase from '../services/firebase';

export const createExerciseAll = ({
  type,
  note,
  createdAt,
}) => async dispatch => {
  let user = firebase.auth().currentUser;
  let db = firebase.database();

  db.ref(`psychologist/${user.uid}/tudazul/${type}/${createdAt}`)
    .set({
      uid: createdAt,
      note,
      createdAt,
    })
    .then(() => {
      dispatch({type: CREATE_EXERCISE_ALL_SUCCESS, payload: {createdAt}});
    })
    .catch(err => {
      dispatch({type: CREATE_EXERCISE_ALL_FAIL, payload: {err}});
    });
};

export const createExerciseOne = ({
  patient,
  type,
  note,
  createdAt,
}) => async dispatch => {
  let user = firebase.auth().currentUser;
  let db = firebase.database();

  db.ref(
    `psychologist/${user.uid}/patients/${patient}/tudazul/${type}/${createdAt}`,
  )
    .set({
      uid: createdAt,
      note,
      createdAt,
    })
    .then(() => {
      dispatch({type: CREATE_EXERCISE_ONE_SUCCESS, payload: {createdAt}});
    })
    .catch(err => {
      dispatch({type: CREATE_EXERCISE_ONE_FAIL, payload: {err}});
    });
};
