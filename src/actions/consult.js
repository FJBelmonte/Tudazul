import {CREATE_CONSULT_FAIL, CREATE_CONSULT_SUCCESS} from './types';

import firebase from '../services/firebase';

export const createConsult = ({
  patient,
  date,
  time,
  type,
  anotation,
}) => async dispatch => {
  let user = firebase.auth().currentUser;
  let db = firebase.database();

  const uid =
    `${('0000' + date.getUTCFullYear()).slice(-4)}` +
    `${('00' + date.getMonth()).slice(-2)}` +
    `${('00' + date.getDate()).slice(-2)}`;
  db.ref(`psychologist/${user.uid}/patients/${patient}/consultations/${uid}`)
    .set({
      uid,
      date: `${date.getDate()}/${date.getMonth()}/${date.getUTCFullYear()}`,
      time: `${time.getHours()}:${time.getMinutes()}`,
      type,
      anotation,
    })
    .then(() => {
      dispatch({type: CREATE_CONSULT_SUCCESS});
    })
    .catch(err => {
      dispatch({type: CREATE_CONSULT_FAIL});
    });
};
