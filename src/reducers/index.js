import auth from './auth';
import {combineReducers} from 'redux';
import consult from './consult';
import exercise from './exercise';
import psychologistPatient from './patient';
import question from './question';

export default combineReducers({
  auth,
  psychologistPatient,
  consult,
  exercise,
  question,
});
