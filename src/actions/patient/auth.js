import {
  FETCH_DIARY,
  FETCH_PATIENT_PATIENT,
  FETCH_PATIENT_PSYCHOLGIST,
  LOGIN_PATIENT_FAIL,
  LOGIN_PATIENT_SUCCESS,
  SET_DIARY,
  SET_PATIENT_LAST_ACCESS,
} from '../types';

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
export const fetchPatient = ref => async dispatch => {
  let db = firebase.database();

  db.ref(`psychologist/${ref.psychologist}/patients/${ref.uid}`)
    .once('value')
    .then(snapshot => {
      const patient = snapshot.val();

      dispatch({
        type: FETCH_PATIENT_PATIENT,
        payload: {patient},
      });
    })
    .catch(err => console.log(err));
};

export const fetchPatientPsychologist = ref => async dispatch => {
  let db = firebase.database();
  db.ref(`psychologist/${ref.psychologist}`)
    .once('value')
    .then(snapshot => {
      const psychologist = snapshot.val();

      dispatch({
        type: FETCH_PATIENT_PSYCHOLGIST,
        payload: {...psychologist},
      });
    })
    .catch(err => console.log(err));
};
export const setLastAccess = (ref, lastAccess) => async dispatch => {
  let db = firebase.database();
  db.ref(`psychologist/${ref.psychologist}/patients/${ref.uid}/lastAccess`)
    .set(lastAccess)
    .then(() => {
      dispatch({
        type: SET_PATIENT_LAST_ACCESS,
      });
    })
    .catch(err => {
      console.log(err);
    });
};
export const setDiary = (ref, lastAccess, diary) => async dispatch => {
  let db = firebase.database();
  db.ref(
    `psychologist/${ref.psychologist}/patients/${ref.uid}/diary/${lastAccess}`,
  )
    .set({
      uid: lastAccess,
      ...diary,
      createdAt: new Date().getTime(),
    })
    .then(() => {
      dispatch({
        type: SET_DIARY,
      });
    })
    .catch(err => {
      console.log(err);
    });
};

export const fetchDiary = ref => async dispatch => {
  let db = firebase.database();
  db.ref(`psychologist/${ref.psychologist}/patients/${ref.uid}/diary/`)
    .once('value')
    .then(snapshot => {
      const diary = snapshot.val();

      dispatch({
        type: FETCH_DIARY,
        payload: {...diary},
        createdAt: new Date().getTime(),
      });
    })
    .catch(err => console.log(err));
};
