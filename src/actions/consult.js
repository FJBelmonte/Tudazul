import {CREATE_CONSULT_FAIL, CREATE_CONSULT_SUCCESS} from './types';

import firebase from '../services/firebase';

export const createConsult = ({
  patient,
  date,
  time,
  type,
  anotation,
  dateTime,
  createdAt,
}) => async dispatch => {
  let user = firebase.auth().currentUser;
  let db = firebase.database();

  const uid =
    `${('0000' + date.getUTCFullYear()).slice(-4)}` +
    `${('00' + date.getMonth()).slice(-2)}` +
    `${('00' + date.getDate()).slice(-2)}`;
  db.ref(`psychologist/${user.uid}/patients/${patient}/consultation/`)
    .set({
      uid,
      date:
        `${('00' + date.getDate()).slice(-2)}/` +
        `${('00' + (date.getMonth() + 1)).slice(-2)}/` +
        `${('0000' + date.getUTCFullYear()).slice(-4)}`,
      time:
        `${('00' + time.getHours()).slice(-2)}:` +
        `${('00' + time.getMinutes()).slice(-2)}`,

      type,
      anotation,
      dateTime,
      createdAt,
    })
    .then(() => {
      dispatch({
        type: CREATE_CONSULT_SUCCESS,
        payload: {createdAt},
      });
    })
    .catch(err => {
      dispatch({type: CREATE_CONSULT_FAIL, payload: {err}});
    });
};
