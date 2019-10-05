import auth from './auth';
import {combineReducers} from 'redux';
import consult from './consult';
import psychologistPatient from './patient';

export default combineReducers({
  auth,
  psychologistPatient,
  consult,
});
