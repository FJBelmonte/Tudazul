import { CREATE_CONSULT_SUCESS, CREATE_CONSULT_FAIL } from "./types";
import firebase from "../services/firebase";

export const createConsult = ({
  patient,
  date,
  time,
  type,
  anotation
}) => async dispatch => {
  let user = firebase.auth().currentUser;
  let db = firebase.database();

  db.ref(`psychologist/${user.uid}/patients/${patient}/consultations`)
    .set({})
    .then(() => {
      //sucess
    })
    .catch(err => {
      //fail
    });
};
