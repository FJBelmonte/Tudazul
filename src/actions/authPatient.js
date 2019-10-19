import {LOGIN_PATIENT_FAIL, LOGIN_PATIENT_SUCCESS} from './types';

import firebase from '../services/firebase';

export const signInPatient = code => async dispatch => {
  let db = firebase.database();

  db.ref(`patients/${code}`)
    .once('value')
    .then(snapshot => {
      const {ref} = snapshot.val();
      dispatch({
        type: LOGIN_PATIENT_SUCCESS,
        payload: ref,
      });
    })
    .catch(err => dispatch({type: LOGIN_PATIENT_FAIL}));
};
