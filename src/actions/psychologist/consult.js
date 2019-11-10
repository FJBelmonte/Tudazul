import {CREATE_CONSULT_FAIL, CREATE_CONSULT_SUCCESS} from '../types';

import firebase from '../../services/firebase';

export const createConsult = ({
  patient,
  date,
  time,
  type,
  anotation,
  dateTime,
  createdAt,
  actionId,
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
      patient,
    })
    .then(() => {
      dispatch({
        type: CREATE_CONSULT_SUCCESS,
        payload: {lastCreated: actionId},
      });
    })
    .catch(err => {
      dispatch({type: CREATE_CONSULT_FAIL, payload: {err}});
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
