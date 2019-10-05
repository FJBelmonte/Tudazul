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

  db.ref(`psychologist/${user.uid}/patients/${patient}/consultations`)
    .set({
      uid: `${date.getUTCFullYear()}${date.getMonth()}${date.getDate()}`,
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
