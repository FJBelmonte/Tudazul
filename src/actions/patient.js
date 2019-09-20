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

export const createPatient = ({
  name,
  age,
  gender,
  anotation
}) => async dispatch => {
  let user = firebase.auth().currentUser;
  let db = firebase.database();
  const uuid = uuidv4();
  db.ref(`psychologist/${user.uid}/patients/${uuid}`).set({
    name,
    age,
    gender,
    anotation,
    psychologist: user.uid
  });

  //adicionar dispatch
};

// generate uid
function uuidv4() {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function(c) {
    let r = (Math.random() * 16) | 0,
      v = c == "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}
