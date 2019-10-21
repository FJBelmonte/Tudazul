import {LOGIN_PATIENT_FAIL, LOGIN_PATIENT_SUCCESS} from '../types';
import _ from 'lodash';
import firebase from '../../services/firebase';

export const signInPatient = code => async dispatch => {
  let db = firebase.database();

  db.ref(`patients/${code}`)
    .once('value')
    .then(snapshot => {
      const ref = snapshot.val();
      if (ref) {
        dispatch({
          type: LOGIN_PATIENT_SUCCESS,
          payload: {ref},
        });
      } else {
        dispatch({type: LOGIN_PATIENT_FAIL});
      }
    })
    .catch(err => dispatch({type: LOGIN_PATIENT_FAIL}));
};
