import {
  CREATE_EXERCISE_ALL_FAIL,
  CREATE_EXERCISE_ALL_SUCCESS,
  CREATE_EXERCISE_ONE_FAIL,
  CREATE_EXERCISE_ONE_SUCCESS,
  FETCH_EXERCISE,
} from '../types';

import firebase from '../../services/firebase';

export const fetchExercises = () => async dispatch => {
  let user = firebase.auth().currentUser;
  let db = firebase.database();

  db.ref(`psychologist/${user.uid}/tudazul`)
    .once('value')
    .then(snapshot => {
      const e = snapshot.val();
      console.log(e);
      dispatch({
        type: FETCH_EXERCISE,
        payload: {exercise: {...e.exercises}, reminder: {...e.reminder}},
      });
    })
    .catch(err => console.log(err));
};

export const createExerciseAll = ({
  type,
  note,
  createdAt,
  actionId,
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
      dispatch({
        type: CREATE_EXERCISE_ALL_SUCCESS,
        payload: {lastCreated: actionId},
      });
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
  actionId,
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
      dispatch({
        type: CREATE_EXERCISE_ONE_SUCCESS,
        payload: {lastCreated: actionId},
      });
    })
    .catch(err => {
      dispatch({type: CREATE_EXERCISE_ONE_FAIL, payload: {err}});
    });
};
// generate uid
function uuidv4() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    let r = (Math.random() * 16) | 0,
      v = c == 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}
