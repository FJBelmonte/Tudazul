import {
  CREATE_PATIENT_CODE_FAIL,
  CREATE_PATIENT_CODE_SUCCESS,
  CREATE_PATIENT_FAIL,
  CREATE_PATIENT_SUCCESS,
  EDIT_PATIENT_FAIL,
  EDIT_PATIENT_SUCESS,
  FETCH_PATIENT,
  FETCH_PATIENTS,
} from '../types';

import firebase from '../../services/firebase';

export const fetchPatients = () => async dispatch => {
  let user = firebase.auth().currentUser;
  let db = firebase.database();

  db.ref(`psychologist/${user.uid}`)
    .once('value')
    .then(snapshot => {
      const {patients} = snapshot.val();
      dispatch({
        type: FETCH_PATIENTS,
        payload: patients,
      });
    })
    .catch(err => console.log(err));
};
export const createPatient = ({
  name,
  age,
  gender,
  anotation,
  createdAt,
  actionId,
}) => async dispatch => {
  let user = firebase.auth().currentUser;
  let db = firebase.database();
  const uuid = uuidv4();
  db.ref(`psychologist/${user.uid}/patients/${uuid}`)
    .set({
      uid: uuid,
      name,
      age,
      gender,
      anotation,
      psychologist: user.uid,
      createdAt,
    })
    .then(() => {
      dispatch({
        type: CREATE_PATIENT_SUCCESS,
        payload: {lastCreated: actionId},
      });
    })
    .catch(err => {
      dispatch({CREATE_PATIENT_FAIL});
    });
};
export const createPatientCode = patient => async dispatch => {
  let db = firebase.database();
  db.ref(`patients/${patient.uid}`)
    .set({uid: patient.uid, psychologist: patient.psychologist})
    .then(() => {
      console.log('SUCESSO');
      dispatch({
        type: CREATE_PATIENT_CODE_SUCCESS,
      });
    })
    .catch(err => {
      console.log('FALHA');
      dispatch({CREATE_PATIENT_CODE_FAIL});
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
