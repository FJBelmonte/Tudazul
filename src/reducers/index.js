import {combineReducers} from 'redux';

// PSYCHOLOGIST
import auth from './psychologist/auth';
import consult from './psychologist/consult';
import exercise from './psychologist/exercise';
import patient from './psychologist/patient';
import question from './psychologist/question';
// END

// PATIENT
import authPatient from './patient/auth';
// END

export default combineReducers({
  auth,
  patient,
  consult,
  exercise,
  question,
  authPatient,
});
