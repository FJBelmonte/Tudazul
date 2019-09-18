import {
  FETCH_PATIENT,
  FETCH_PATIENTS,
  CREATE_PATIENT_SUCESS,
  CREATE_PATIENT_FAIL,
  EDIT_PATIENT_SUCESS,
  EDIT_PATIENT_FAIL
} from "./types";

import firebase from "../services/firebase";

export const fetchPatients = () => async dispatch => {
  let user = firebase.auth().currentUser;
  let db = firebase.database();

  db.ref(`psicologo/${user.uid}`)
    .once("value")
    .then(snapshot => {
      const { patients } = snapshot.val();
      dispatch({
        type: FETCH_PATIENTS,
        payload: patients
      });
    })
    .catch(err => console.log(err));
};

export const createPatient = () => async dispatch => {};
